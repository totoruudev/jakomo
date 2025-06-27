package com.jakomo.app.util;

import com.jakomo.app.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String uri = request.getRequestURI();
        System.out.println("JWTFilter - 요청 URI: " + uri);

        // 공개 API 경로 토큰 검사 skip
        if (uri.matches("^/api/products(/.*)?$") || uri.startsWith("/api/review/best")) {
            System.out.println(">>> 공개 API, JWT 검사 skip! : " + uri);
            filterChain.doFilter(request, response);
            return;
        }

        String authorization = request.getHeader("Authorization");

        if (authorization != null && authorization.startsWith("Bearer ")) {
            String token = authorization.substring(7);

            try {
                if (jwtUtil.validateToken(token)) {
                    String email = jwtUtil.getEmail(token);
                    System.out.println("✅ 토큰 유효: " + email);

                    UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                } else {
                    System.out.println("❌ 토큰 유효하지 않음");
                }
            } catch (Exception e) {
                System.out.println("❌ JWT 검증 실패: " + e.getMessage());
            }
        } else {
            System.out.println("⚠️ Authorization 헤더 없음 또는 형식 오류");
        }

        filterChain.doFilter(request, response);
    }


}

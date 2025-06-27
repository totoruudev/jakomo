package com.jakomo.app.config;

import com.jakomo.app.service.CustomUserDetailsService;
import com.jakomo.app.util.JWTFilter;
import com.jakomo.app.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JWTUtil jwtUtil;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // 실제 프론트 주소와 포트 명시 (여러개면 리스트에 콤마로 추가)
        configuration.setAllowedOriginPatterns(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 전체 경로에 적용
        return source;
    }

    // 비밀번호 암호화용 빈
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 인증 매니저
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // 시큐리티 필터 체인
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // [정적 리소스] - React 빌드/이미지 등
                        .requestMatchers(
                                "/", "/index.html",
                                "/favicon.ico", "/logo192.png", "/logo512.png",
                                "/manifest.json", "/asset-manifest.json", "/robots.txt",
                                "/images/**", "/data/**",
                                "/uploads/**", "/static/**", "/css/**", "/js/**"
                        ).permitAll()

                        // [SPA 라우터 경로] - 프론트엔드 경로 직접 입력/새로고침 허용
                        .requestMatchers(
                                "/login", "/join",
                                "/products", "/products/**",
                                "/review", "/review/**",
                                "/promotion", "/promotion/**",
                                "/faq", "/faq/**",
                                "/notice", "/notice/**",
                                "/showroom", "/showroom/**",
                                "/support", "/support/**",
                                "/cart", "/mypage",
                                "/chatbot"
                        ).permitAll()

                        // [공개 API] - 인증 필요 없는 API는 명확히 지정
                        .requestMatchers(
                                "/api/auth/login", "/api/auth/join",
                                "/api/products", "/api/products/**",
                                "/api/promotion", "/api/promotion/**",
                                "/api/faq", "/api/faq/**",
                                "/api/notice", "/api/notice/**",
                                "/api/review", "/api/review/**",
                                "/api/showroom", "/api/showroom/**",
                                "/api/support", "/api/support/**",
                                "/api/chatbot", "/api/chatbot/**",
                                "/api/payment", "/api/payment/**"
                        ).permitAll()

                        // [관리자 API]
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // [나머지 API는 인증 필요]
                        .requestMatchers("/api/**").authenticated()

                        // [그 외 모든 경로도 허용(404는 React에서 SPA로 처리)]
                        .anyRequest().permitAll()
                )
                .addFilterBefore(new JWTFilter(jwtUtil, customUserDetailsService), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}

﻿namespace Shop.Server.DTO.Auth
{
    public class LoginRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string IdToken { get; set; }
    }
}
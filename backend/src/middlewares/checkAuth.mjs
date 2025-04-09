
export function checkAuth(request,response,next){
    if (!request.isAuthenticated()) {
        return response.status(401).json({ msg: "Usuário precisa estar logado!" });
      }
      next();
}
import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'home' },
    { title: 'Produtos', url: '/produtos', icon: 'bag-handle' },
    { title: 'Promoções', url: '/folder/promocoes', icon: 'pricetags' },
    { title: 'Lojas', url: '/folder/lojas', icon: 'storefront' },
    { title: 'Perfil', url: '/folder/perfil', icon: 'person-circle' },
    { title: 'Contato', url: '/folder/contato', icon: 'call' },
  ];

  public adminPages = [
    { title: 'Cadastrar Produtos', url: '/cad-produtos', icon: 'bag-add' },
    { title: 'Editar Produtos', url: '/edit-produtos', icon: 'create' },
    { title: 'Deletar Produtos', url: '/delete-produtos', icon: 'trash' },
  ];


  mensagem: string = ''
  logado: boolean = false
  isToastOpen = false
  user:any={nome:'',foto:''}
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  logout() {
    this.mensagem = 'LogOut efetuado com sucesso!'
    this.setOpen(true)
    this.logado = !this.logado
    this.logOutComGoogle()
  }
  loginComGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(this.auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        this.mensagem = `Usuário: ${result.user.displayName} logado com sucesso!`
        this.user.nome=result.user.displayName
        this.user.foto=result.user.photoURL
        this.setOpen(true)
        this.logado = !this.logado
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  logOutComGoogle(){
    return signOut(this.auth)
  }
  constructor(private auth: Auth) { }



}

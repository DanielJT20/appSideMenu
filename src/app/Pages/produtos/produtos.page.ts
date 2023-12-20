import { Component, OnInit } from '@angular/core';
import { Firestore, getDocs } from '@angular/fire/firestore';
import { getStorage, ref, listAll, Storage, getDownloadURL } from '@angular/fire/storage';
import { collection } from 'firebase/firestore';
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  produtos: any = [{
    nome: '',
    descricao: '',
    preco: '',
    qtd: '',
    image: ''
  }]

  constructor(private storage: Storage, private firestore: Firestore) { }

  ngOnInit() {
    this.listarBanco()
  }

  async listarBanco() {
    const querySnapshot = await getDocs(collection(this.firestore, "Produtos"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()['nome']}`);
      this.produtos = [...this.produtos, { nome: doc.data()['nome'], descricao: doc.data()['descricao'], preco: doc.data()['preco'], qtd: doc.data()['qtd'], image: doc.data()['image'] }]
    });
  }
}
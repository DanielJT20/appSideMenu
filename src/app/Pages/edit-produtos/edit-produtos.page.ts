import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { getStorage, ref, listAll, Storage, getDownloadURL } from '@angular/fire/storage';
@Component({
  selector: 'app-edit-produtos',
  templateUrl: './edit-produtos.page.html',
  styleUrls: ['./edit-produtos.page.scss'],
})
export class EditProdutosPage implements OnInit {
  isToastOpen = false;
  produtos: any = []

  public alertButtons = ['OK'];
  public alertInputs = [
    {
      placeholder: 'Name',
    },
    {
      placeholder: 'Nickname (max 8 characters)',
      attributes: {
        maxlength: 8,
      },
    },
    {
      type: 'number',
      placeholder: 'Age',
      min: 1,
      max: 100,
    },
    {
      type: 'textarea',
      placeholder: 'A little about yourself',
    },
  ];
  
  constructor(private storage: Storage, private firestore: Firestore) { }
  ngOnInit() {
    this.listarBanco()
  }
  async listarBanco() {
    const querySnapshot = await getDocs(collection(this.firestore, "Produtos"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()['nome']}`);
      this.produtos = [...this.produtos, { id: doc.id, nome: doc.data()['nome'], descricao: doc.data()['descricao'], preco: doc.data()['preco'], qtd: doc.data()['qtd'], image: doc.data()['image'] }]
    });
  }

  mensagem(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async EditarItem(isOpen: boolean, id: string) {
    await deleteDoc(doc(this.firestore, "Produtos", id));
    this.mensagem(isOpen)
    setTimeout(() => {
      this.produtos = []
      this.listarBanco()
    }, 2000);
  }

}









import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [FirebaseService]
})
export class QuestionsComponent implements OnInit {

  public csvText: '';

  constructor(private firebaseService: FirebaseService) { }

  // Add Questions
  onClickAddQuestionsButton(){

  }

  ngOnInit() {
  }

}

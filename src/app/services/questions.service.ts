import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';


// Default Values
export class QuestionListing {
  name: "Sumedhe"
  age: 25
}


@Injectable()
export class QuestionsService {

  constructor(private db: AngularFireDatabase) { }

  // Create new question
  createQuestion(): AngularFireObject<QuestionListing> {
    const qDefault = new QuestionListing();
    const qKey = this.db.list('questions').push(qDefault).key;
    return this.db.object('questions/' + qKey);
  }

  updateQuestion(question: AngularFireObject<QuestionListing>, data: any){
    return question.update(data);
  }

}

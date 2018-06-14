import { FirestoreService } from '#core/firestore.service'
import { Injectable } from '@angular/core'

@Injectable()
export class MlsService {
  apiBase = 'http://localhost:8080'

  constructor(private firestore: FirestoreService) {}

  public getListings(agentId) {
    return this.firestore.promiseColWithIds(`listings`, ref =>
      ref.where('agentId', '==', agentId)
    )
  }
}

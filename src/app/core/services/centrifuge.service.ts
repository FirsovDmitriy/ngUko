import { Injectable, OnDestroy } from "@angular/core";
import { Centrifuge, Subscription } from 'centrifuge';
import { Observable, share, Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CentrifugeService implements OnDestroy {
  private channelSubjects = new Map<string, Subject<any>>()

  private centrifugeSubs = new Map<string, Subscription>()

  private _centrifuge: Centrifuge

  constructor() {
    this._centrifuge = new Centrifuge('wsurl')

    this._centrifuge.connect()
  }

  /**
   * Подписаться на канал и получить Observable публикаций
   * @param channelName имя канала (topic) на сервере Centrifugo
   */
  public subscribe<T = any>(channelName: string): Observable<T> {
    if(this.channelSubjects.has(channelName)) {
      return this.channelSubjects.get(channelName)!.asObservable()
    }

    const subject = new Subject<T>()
    const sub = this._centrifuge.newSubscription(channelName)

    sub.on('publication', context => {
      subject.next(context.data as T)
    })
    sub.on('error', context => {
      subject.error(context)
    })
    sub.on('unsubscribed', () => {
      subject.complete()
    })

    sub.subscribe()

    this.centrifugeSubs.set(channelName, sub)
    this.channelSubjects.set(channelName, subject)

    return subject.asObservable().pipe(share())
  }

  public unsubscribe(channelName: string): void {
    const subj = this.channelSubjects.get(channelName)
    const sub = this.centrifugeSubs.get(channelName)

    if(sub) {
      sub.unsubscribe()
      this.centrifugeSubs.delete(channelName)
    }

    if(subj) {
      subj.complete()
      this.channelSubjects.delete(channelName)
    }
  }

  ngOnDestroy(): void {
    this.centrifugeSubs.forEach((sub, channel) => {
      sub.unsubscribe()
      this.channelSubjects.get(channel)?.complete()
    })

    this._centrifuge.disconnect()
  }
}

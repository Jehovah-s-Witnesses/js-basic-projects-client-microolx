import {
  notificationTypes,
  notificationClasses,
} from './notification.constants.ts';

export class Notifications {
  renderPlace: HTMLElement | null = null;
  notificationElement: HTMLDivElement | null = null;

  constructor(renderPlace: HTMLElement) {
    this.renderPlace = renderPlace;
    this.notificationElement = document.createElement('div');
    this.notificationElement.classList.add(notificationClasses.base);
  }

  show(messageList: string[], type: 'success' | 'danger') {
    if (this.notificationElement instanceof HTMLDivElement) {
      this.notificationElement.innerHTML = '';
      this.notificationElement.classList.remove(
        notificationTypes.DANGER,
        notificationTypes.SUCCESS,
      );

      if (type === 'success') {
        this.notificationElement.classList.add(notificationTypes.SUCCESS);
      }

      if (type === 'danger') {
        this.notificationElement.classList.add(notificationTypes.DANGER);
      }

      messageList.forEach((message) => {
        const messageText = document.createElement('p');
        messageText.innerText = message;

        if (this.notificationElement instanceof HTMLDivElement) {
          this.notificationElement.append(messageText);
        }
      });

      if (this.renderPlace instanceof HTMLElement) {
        this.renderPlace.append(this.notificationElement);
      }
    }
  }

  clear() {
    if (this.notificationElement instanceof HTMLDivElement) {
      this.notificationElement.remove();
    }
  }
}

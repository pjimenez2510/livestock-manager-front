import AxiosClient from "@/core/infrastructure/http/AxiosClient";
import { Subscription } from "../models/subscription.interface";

interface Notification {
  suscribeUser: (
    token: string,
    userId: number
  ) => Promise<Subscription | undefined>;
  updateSubscription: (
    susbscription: Subscription
  ) => Promise<Subscription | undefined>;
}

export class NotificationService implements Notification {
  url = "/subscriptions";
  private axiosClient = AxiosClient.getInstance();

  static getInstance(): Notification {
    return new NotificationService();
  }

  async suscribeUser(token: string, userId: number) {
    const objectSubscription = {
      token,
      userId,
    };

    const { data } = await this.axiosClient.post<Subscription>(
      this.url,
      objectSubscription
    );

    return data.data;
  }

  async updateSubscription(subscription: Subscription) {
    const { data } = await this.axiosClient.put<Subscription>(
      `${this.url}/${subscription.id}`,
      subscription
    );

    return data.data;
  }
}

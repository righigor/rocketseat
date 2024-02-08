type Message = { pollOptionId: string, votes: number }

type Subscriber = (message: Message) => void;

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {}

  subscribe(pollId: string, sub: Subscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = []
    }
    this.channels[pollId].push(sub);
  }

  publish(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return;
    }

    for (const sub of this.channels[pollId]) {
      sub(message)
    }
  }
}

export const voting = new VotingPubSub();
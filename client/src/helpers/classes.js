class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {

  constructor(data, next) {
    this.head = data ? new Node(data, next) : null;
  }

  static append(list, data) {
    const output = new LinkedList(list.data, list.next);
    if (!output.head) {
      output.head = new Node(data);
      return output;
    }
    let current = output.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = new Node(data);
    return output;
  }

  static prepend(list, data) {
    const output = new LinkedList(list.head.data, list.head.next);
    if (output.head === null) {
      output.head = new Node(data);
      return output;
    }
    const newHead = new Node(data);
    newHead.next = output.head;
    output.head = newHead;
    return output;
  }

  static deleteWithValue(list, data) {
    const output = new LinkedList(list.data, list.next);
    let node = output.head;
    while (node.next !== null) {
      if (node.next.data === data) {
        node.next = node.next.next;
        return;
      }
      node = node.next;
    }
  }

  static removeHead(list) {
    const output = new LinkedList(list.head.data, list.head.next);
    console.log(output.head);
    if (output.head.next === null) {
      return output;
    }
    output.head = output.head.next;
    return output;
  }

  static modifyHeadData(list, data) {
    return new LinkedList(data, list.head.next);
  }

  display() {
    let node = this.head;
    const output = [];
    while (node) {
      output.push(node.data);
      node = node.next;
    }
    return output;
  }

}

export { Node, LinkedList };

const relu = value => Math.max(0, value);

class Node {
  constructor({ type, weight, bias, id }) {
    this.type = type;
    this.weight = weight || 0;
    this.bias = bias || 0;
    this.value = 0;
    this.id = id;
  };

  setValue(input) {
    this.value = Math.tanh(relu((input * this.bias) + this.weight));
  }

  getValue() {
    return this.value;
  }
};

export default Node;

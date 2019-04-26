import Node from '../node';
import Connection from '../connection';

class Network {
  constructor({ inputSize = 0, hiddenSize = 0, outputSize = 0 }) {
    this.inputs = [];
    this.hidden = [];
    this.output = [];
    this.connections = [];

    let id = 0;

    // create input nodes
    for (let i = 0; i < inputSize; i++) {
      this.inputs.push(new Node({
        type: 'input',
        bias: Math.random() * 4 - 2,
        weight: Math.random() * 4 - 2,
        id
      }));
      id++;
    }

    // create hidden nodes
    for (let i = 0; i < hiddenSize; i++) {
      this.hidden.push(new Node({
        type: 'hidden',
        bias: Math.random() * 4 - 2,
        weight: Math.random() * 4 - 2,
        id
      }));
      id++;
    }

    // create output nodes
    for (let i = 0; i < outputSize; i++) {
      this.output.push(new Node({
        type: 'output',
        bias: Math.random() * 4 - 2,
        weight: Math.random() * 4 - 2,
        id
      }));
      id++;
    }

    this.makeConnections();
  }

  makeConnections() {
    // create connections from input nodes to hidden nodes
    this.inputs.forEach(input => {
      this.hidden.forEach(hidden => {
        this.connections.push(new Connection(input, hidden));
      })
    });

    // create connections from hidden nodes to output nodes
    this.hidden.forEach(hidden => {
      this.output.forEach(output => {
        this.connections.push(new Connection(hidden, output));
      })
    });
  }

  sumConnections(toNode) {
    return this.connections
      .filter(connection => connection.to === toNode)
      .reduce((accumulator, connection) => accumulator + connection.from.value, 0);
  }

  activate(data) {
    // map data to the input nodes
    data.forEach((input, i) => {
      this.inputs[i].setValue(input);
    });

    // sum all of the input nodes connecting to each hidden node
    this.hidden.forEach(hidden => {
      const value = this.sumConnections(hidden);
      hidden.setValue(value);
    });

    // sum all of the hidden nodes connecting to each output node
    this.output.forEach(output => {
      const value = this.sumConnections(output);
      output.setValue(value);
    });

    return this.output.map(output => output.getValue());
  }

  export() {
    return JSON.stringify({
      inputs: this.inputs,
      hidden: this.hidden,
      outputs: this.output,
    });
  }

  import(network) {
    const { inputs, hidden, outputs } = JSON.parse(network);
    this.inputs = inputs;
    this.hidden = hidden;
    this.output = outputs;

    this.makeConnections();
  }
}

export default Network;

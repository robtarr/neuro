import Network from '../network';
import { modifyWeight } from '../mutations';

class Ecosystem {
  constructor({
    populationSize = 50,
    mutationRate = 0.25,
    elitism = 0.10,
    inputSize,
    hiddenSize,
    outputSize
  }) {
    this.elite = populationSize * elitism;
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    this.agents = [];
    this.generation = 0;

    for (let i=0; i < this.populationSize; i++) {
      this.agents[i] = new Network({ inputSize, hiddenSize, outputSize });
    }
  }

  sort() {
    this.agents.sort((a, b) => {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    });
  }

  selection() {
    this.sort();
    const newPopulation = [];

    for (let i=0; i < this.elite; i++) {
      newPopulation.push(this.agents[i]);
    }

    return newPopulation;
  }

  mutate(network) {
    [...network.inputs, ...network.hidden, ...network.output]
      .forEach(node => {
        if (Math.random() < this.mutationRate) {
          node.weight = modifyWeight(node.weight);
        }
      });
  }

  evolve() {
    const newPopulation = this.selection();

    for (let i=this.populationSize - 1; i > this.elite; i--) {
      const offspring = this.mutate(this.agents[i]);
    }

    this.generation += 1;
  }
}

export default Ecosystem;

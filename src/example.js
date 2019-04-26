import Ecosystem from './ecosystem';

const run = () => {
  const eco = new Ecosystem({
    inputSize: 6,
    hiddenSize: 6,
    outputSize: 3,
    populationSize: 10,
    elitism: 0.10
  });

  while (eco.generation < 500) {
    eco.agents.forEach(agent => {
      const result = agent.activate([Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
      agent.score = fitness(result);
    });

    eco.sort();
    console.log(`Generation ${eco.generation} scores:`);
    eco.agents.forEach(agent => { console.log(`${agent.score.toFixed(4)} - [${agent.output[0].value.toFixed(2)}, ${agent.output[1].value.toFixed(2)}, ${agent.output[2].value.toFixed(2)}]`) });

    eco.evolve();
  }
}

const fitness = result => result[0] * 10 - result[1] - result[2];

console.log('Go!');
run();

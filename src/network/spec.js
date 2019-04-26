import { expect } from 'chai';
import Network from './';

describe('Node', () => {
  describe('#activate', () => {
    xit('does its thing', () => {
      const network = new Network({
        inputSize: 1,
        hiddenSize: 1,
        outputSize: 1
      });

      expect(network.activate([0])).to.deep.equal([0]);
    });
  });
});
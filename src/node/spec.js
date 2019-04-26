import { expect } from 'chai';
import Node from './';

describe('Node', () => {
  describe('input', () => {
    describe('defaults', () => {
      it('uses default weight', () => {
        const node = new Node({
          type: 'input',
        });

        expect(node.weight).to.equal(0);
        expect(node.bias).to.equal(0);
      });

    });

    it('sets weight', () => {
      const node = new Node({
        type: 'input',
        weight: 0.5
      });

      expect(node.weight).to.equal(0.5);
    });

    it('sets bias', () => {
      const node = new Node({
        type: 'input',
        bias: 0.2
      });

      expect(node.bias).to.equal(0.2);
    });

    it('outputs the correct value', () => {
      const node = new Node({
        type: 'input',
        bias: 0.2,
        weight: 2
      });

      node.setValue(0.35)

      expect(node.value).to.equal(2.07);
    })
  });
});
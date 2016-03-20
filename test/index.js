import 'babel-polyfill';
import { before, describe, it } from 'mocha';
import React from 'react';
import chai from 'chai';
import fileSystem from 'fs';
import grumpkin from '../src';

chai.should();

describe('grumpkin', () => {
  let stylesheet = null;
  before((done) => {
    fileSystem.readFile(
      './test/style.css',
      'utf8',
      (exception, readData) => {
        if (exception) {
          throw exception;
        }
        stylesheet = readData;
        done();
      });
  });


  it('simple render', () => {
    const element = <div className="foo">Hello World!</div>;
    const computedStyle = grumpkin(element, stylesheet);
    computedStyle.should.have.property('width').and.equal('46px');
    computedStyle.should.have.property('height').and.equal('300px');
    computedStyle.should.have.property('color').and.equal('#fff');
  });
});

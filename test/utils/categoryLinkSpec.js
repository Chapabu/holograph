'use strict';

const chai = require('chai');
const expect = chai.expect;
const categoryLink = require('../../libs/utils/categoryLink');

describe('categoryLink', function () {

  it('converts categories to lowercase', function () {

    const categoryLinkTest = categoryLink('CaTeGoRy');
    expect(categoryLinkTest).to.equal('category.html');

  });

  it('converts spaces to dashes', function () {

    const categoryLinkTest = categoryLink('My Holograph Category');
    expect(categoryLinkTest).to.equal('my-holograph-category.html');

  });

  it('removes anything that\'s not a string or space', function () {

    const categoryLinkTestOne = categoryLink('This $is &a() dodgy£ catego]ry');
    const categoryLinkTestTwo = categoryLink('!This i`s a\' dodg*y ca@tegory');

    expect(categoryLinkTestOne).to.equal('this-is-a-dodgy-category.html');
    expect(categoryLinkTestTwo).to.equal('this-is-a-dodgy-category.html');

  });

});
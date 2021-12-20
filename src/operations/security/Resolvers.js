const getCertificateList = require('./query.getCertificateList');
const getCertificationAuthorities = require('./query.getCertificationAuthorities');

const associateDevice = require('./mutation.associateDevice');
const createCertificate = require('./mutation.createCertificate');
const deleteCertificates = require('./mutation.deleteCertificates');
const disassociateDevice = require('./mutation.disassociateDevice');
const createCertificationAuthority = require('./mutation.createCertificationAuthority');
const deleteCertificationAuthorities = require('./mutation.deleteCertificationAuthorities');

const Resolvers = {
  Query: {
    getCertificateList,
    getCertificationAuthorities,
  },
  Mutation: {
    associateDevice,
    createCertificate,
    deleteCertificates,
    disassociateDevice,
    createCertificationAuthority,
    deleteCertificationAuthorities,
  },
};

module.exports = Resolvers;

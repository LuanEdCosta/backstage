const service = require("../../services/service.security");
const helpers = require("./helpers");
const LOG = require("../../utils/Log");


const createCertificate = async (_, {commonName = 'dojot'}, {token}) => {
  const hashAlgorithm = 'SHA-256';
  const signAlgorithm = 'RSASSA-PKCS1-V1_5';
  let subjAltCSR = {
    // ex ['localhost', 'localhost2']
    dns: [],
    // ex ['192.168.1.1', '192.168.1.2', '192.168.1.3']
    ip: [],
    // ex ['email@address.com', 'email2@address.com']
    email: [],
  };
  let typesAndValues = {
    organizationUnit: '',
    country: '',
    state: '',
    locality: '',
    organization: '',
  };

  try {
    const {
      privateKeyPEM,
      publicKeyPEM,
      privateKeyPkcs8,
      publicKeyPkcs8
    } = await helpers.generateKeyPar(signAlgorithm, hashAlgorithm);

    const csrPEM = await helpers.createCSR(
      commonName,
      publicKeyPkcs8,
      privateKeyPkcs8,
      hashAlgorithm,
      typesAndValues,
      subjAltCSR
    );

    const {data: {certificatePem, certificateFingerprint}} = await service.createCertificate(token, csrPEM);

    return {
      certificatePem,
      certificateFingerprint,
      privateKeyPEM,
      publicKeyPEM
    }

  } catch (e) {
    const {response: {data: {error}}} = e;
    LOG.error(error.stack || error);
    throw error;
  }
}

module.exports = createCertificate;

const LOG = require('../../utils/Log');
const service = require('../../services/service.security');

const associateDevice = async (_, { fingerprint, deviceId }, { token }) => {
  try {
    await service.associateCertificate(token, fingerprint, deviceId);
    return 'ok';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = associateDevice;

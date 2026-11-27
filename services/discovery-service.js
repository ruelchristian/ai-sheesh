'use strict';

const discovery = require('./discovery');

function createDiscoveryService(loadResources) {
  const load = typeof loadResources === 'function' ? loadResources : () => Promise.resolve([]);

  return {
    async searchResources(query, options) {
      return discovery.searchResources(await load(), query, options);
    },

    async getResourceDetails(id) {
      return discovery.getResourceDetails(await load(), id);
    },

    async findResourcesForTask(taskDescription, options) {
      return discovery.findResourcesForTask(await load(), taskDescription, options);
    }
  };
}

module.exports = { createDiscoveryService };

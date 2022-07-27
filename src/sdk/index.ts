/**
 * @file Manifold
 * @desc This file defines the constructor of the `Manifold` class.
 * @hidden
 */

import { ethers } from 'ethers';
import * as eth from './eth';
import * as util from './util';
import * as cToken from './cToken';
import * as priceFeed from './priceFeed';
import * as fold from './fold';
import * as gov from './gov';
import * as api from './api';
import { constants, decimals } from './constants';
import { Provider, ManifoldOptions, ManifoldInstance } from './types';

// Turn off Ethers.js warnings
ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);

/**
 * Creates an instance of the Manifold.js SDK.
 *
 * @param {Provider | string} [provider] Optional Ethereum network provider.
 *     Defaults to Ethers.js fallback mainnet provider.
 * @param {object} [options] Optional provider options.
 *
 * @example
 * ```
 * var foldound = new Manifold(window.ethereum); // web browser
 *
 * var foldound = new Manifold('http://127.0.0.1:8545'); // HTTP provider
 *
 * var foldound = new Manifold(); // Uses Ethers.js fallback mainnet (for testing only)
 *
 * var foldound = new Manifold('ropsten'); // Uses Ethers.js fallback (for testing only)
 *
 * // Init with private key (server side)
 * var foldound = new Manifold('https://mainnet.infura.io/v3/_your_project_id_', {
 *   privateKey: '0x_your_private_key_', // preferably with environment variable
 * });
 *
 * // Init with HD mnemonic (server side)
 * var foldound = new Manifold('mainnet' {
 *   mnemonic: 'clutch captain shoe...', // preferably with environment variable
 * });
 * ```
 *
 * @returns {object} Returns an instance of the Manifold.js SDK.
 */
const Manifold = function (
  provider: Provider | string = 'mainnet',
  options: ManifoldOptions = {},
): ManifoldInstance {
  const originalProvider = provider;

  options.provider = provider || options.provider;
  provider = eth._createProvider(options);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instance: any = {
    _originalProvider: originalProvider,
    _provider: provider,
    ...cToken,
    ...priceFeed,
    ...gov,
    claimComp: fold.claimComp,
    delegate: fold.delegate,
    delegateBySig: fold.delegateBySig,
    createDelegateSignature: fold.createDelegateSignature,
  };

  // Instance needs to know which network the provider connects to, so it can
  //     use the correct contract addresses.
  instance._networkPromise = eth.getProviderNetwork(provider).then((network) => {
    delete instance._networkPromise;
    instance._network = network;
  });

  return instance;
};

Manifold.eth = eth;
Manifold.api = api;
Manifold.util = util;
Manifold._ethers = ethers;
Manifold.decimals = decimals;
Manifold.fold = {
  getCompBalance: fold.getCompBalance,
  getCompAccrued: fold.getCompAccrued,
};
Object.assign(Manifold, constants);

export = Manifold;

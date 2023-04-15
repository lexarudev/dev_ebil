// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

interface ITradeTrustTokenRestorable {
  function restore(uint256 tokenId) external returns (address);
}

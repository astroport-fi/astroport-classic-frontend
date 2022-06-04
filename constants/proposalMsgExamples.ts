export type ProposalExample = {
  code: string;
  desc: string;
};

export const example1 = `[
  {
    "msg": {
      "bank": {
        "send": {
          "amount": [
            {
              "amount": "100",
              "denom": "uluna"
            }
          ],
          "to_address": "terra..."
        }
      }
    },
    "order": "1"
  }
]`;

export const example2 = `[
  {
    "msg": {
      "wasm": {
        "execute": {
          "contract_addr": "factory_contract",
          "funds": [],
          "msg": BASE64_ENCODED_JSON_STRING({
            "update_config": {
              "fee_address": "terra..."
            }
          })
        }
      }
    },
    "order": "1"
  }
]
`;

export const example3 = `[
  {
    "msg": {
      "wasm": {
        "execute": {
          "contract_addr": "factory_contract",
          "funds": [],
          "msg": BASE64_ENCODED_JSON_STRING({
            "update_config": {
              "generator_address": "terra..."
            }
          })
        }
      }
    },
    "order": "1"
  }
]
`;

export const proposals: ProposalExample[] = [
  {
    code: example1,
    desc: "Send LUNAC that the Assembly contract holds to another address",
  },
  {
    code: example2,
    desc: "Set the fee_address in the bombay factory contract to terra...",
  },
  {
    code: example3,
    desc: "Set the generator_address  in the bombay factory contract to terra...",
  },
];

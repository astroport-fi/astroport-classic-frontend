const whitelist = {
  mainnet: {
    tokens: {
      terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3: {
        protocol: "Astroport",
        symbol: "ASTRO",
        token: "terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3",
        icon: "/tokens/astro.png",
        decimals: 6,
      },
      uluna: {
        protocol: "Terra",
        symbol: "LUNA",
        token: "uluna",
        icon: "https://assets.terra.money/icon/60/Luna.png",
      },
      uusd: {
        protocol: "Terra USD",
        symbol: "UST",
        token: "uusd",
        icon: "https://assets.terra.money/icon/60/UST.png",
      },
      terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76: {
        protocol: "Anchor",
        symbol: "ANC",
        token: "terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76",
        icon: "https://whitelist.anchorprotocol.com/logo/ANC.png",
        decimals: 6,
      },
      terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n: {
        protocol: "StarTerra",
        symbol: "STT",
        token: "terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n",
        icon: "https://starterra.io/assets/100x100_starterra.png",
        decimals: 6,
      },
      terra1mddcdx0ujx89f38gu7zspk2r2ffdl5enyz2u03: {
        protocol: "Orion",
        symbol: "ORION",
        token: "terra1mddcdx0ujx89f38gu7zspk2r2ffdl5enyz2u03",
        icon: "https://orion.money/assets/ORION-LOGO-2.1-GREEN@256x256.png",
        decimals: 8,
      },
      terra100yeqvww74h4yaejj6h733thgcafdaukjtw397: {
        protocol: "Apollo",
        symbol: "APOLLO",
        token: "terra100yeqvww74h4yaejj6h733thgcafdaukjtw397",
        icon: "https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png",
        decimals: 6,
      },
      terra12897djskt9rge8dtmm86w654g7kzckkd698608: {
        protocol: "Nexus",
        symbol: "PSI",
        token: "terra12897djskt9rge8dtmm86w654g7kzckkd698608",
        icon: "https://terra.nexusprotocol.app/assets/psi.png",
        decimals: 6,
      },
      terra1dy9kmlm4anr92e42mrkjwzyvfqwz66un00rwr5: {
        protocol: "Valkyrie",
        symbol: "VKR",
        token: "terra1dy9kmlm4anr92e42mrkjwzyvfqwz66un00rwr5",
        icon: "https://app.valkyrieprotocol.com/icon_vkr.png",
        decimals: 6,
      },
      terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6: {
        protocol: "Mirror",
        symbol: "MIR",
        token: "terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6",
        icon: "https://whitelist.mirror.finance/icon/MIR.png",
        decimals: 6,
      },
      terra1kcthelkax4j9x8d3ny6sdag0qmxxynl3qtcrpy: {
        protocol: "Pylon",
        symbol: "MINE",
        token: "terra1kcthelkax4j9x8d3ny6sdag0qmxxynl3qtcrpy",
        icon: "https://assets.pylon.rocks/logo/MINE.png",
        decimals: 6,
      },
      terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp: {
        protocol: "Terra Bonded Luna",
        symbol: "bLUNA",
        token: "terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp",
        icon: "https://whitelist.anchorprotocol.com/logo/bLUNA.png",
        decimals: 6,
      },
      terra190tqwgqx7s8qrknz6kckct7v607cu068gfujpk: {
        protocol: "Wormhole Solana",
        symbol: "wSOL",
        token: "terra190tqwgqx7s8qrknz6kckct7v607cu068gfujpk",
        icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/SOL_wh.png",
        decimals: 8,
      },
      terra1hj8de24c3yqvcsv9r8chr03fzwsak3hgd8gv3m: {
        protocol: "Wormhole Avalanche",
        symbol: "wAVAX",
        token: "terra1hj8de24c3yqvcsv9r8chr03fzwsak3hgd8gv3m",
        icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/AVAX_wh.png",
        decimals: 8,
      },
      terra1cetg5wruw2wsdjp7j46rj44xdel00z006e9yg8: {
        protocol: "Wormhole Binance Coin",
        symbol: "wBNB",
        token: "terra1cetg5wruw2wsdjp7j46rj44xdel00z006e9yg8",
        icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/BNB_wh.png",
        decimals: 8,
      },
      terra14tl83xcwqjy0ken9peu4pjjuu755lrry2uy25r: {
        protocol: "Wormhole Ether",
        symbol: "wETH",
        token: "terra14tl83xcwqjy0ken9peu4pjjuu755lrry2uy25r",
        icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/ETH_wh.png",
        decimals: 8,
      },
      terra1dtqlfecglk47yplfrtwjzyagkgcqqngd5lgjp8: {
        protocol: "Wormhole Matic",
        symbol: "wMATIC",
        token: "terra1dtqlfecglk47yplfrtwjzyagkgcqqngd5lgjp8",
        icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/MATICpo_wh.png",
        decimals: 8,
      },
      terra169edevav3pdrtjcx35j6pvzuv54aevewar4nlh: {
        protocol: "XDEFI",
        symbol: "XDEFI",
        token: "terra169edevav3pdrtjcx35j6pvzuv54aevewar4nlh",
        icon: "/tokens/xdefi.svg",
        decimals: 8,
      },
      terra1pepwcav40nvj3kh60qqgrk8k07ydmc00xyat06: {
        protocol: "Wormhole Eth USDC",
        symbol: "weUSDC",
        token: "terra1pepwcav40nvj3kh60qqgrk8k07ydmc00xyat06",
        icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/USDCet_wh.png",
        decimals: 6,
      },
      terra1e6mq63y64zcxz8xyu5van4tgkhemj3r86yvgu4: {
        protocol: "Wormhole Solana USDC",
        symbol: "wsoUSDC",
        token: "terra1e6mq63y64zcxz8xyu5van4tgkhemj3r86yvgu4",
        icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/USDCso_wh.png",
        decimals: 6,
      },
      terra1pvel56a2hs93yd429pzv9zp5aptcjg5ulhkz7w: {
        protocol: "Wormhole Avax USDC",
        symbol: "wavUSDC",
        token: "terra1pvel56a2hs93yd429pzv9zp5aptcjg5ulhkz7w",
        icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/USDCav_wh.png",
        decimals: 6,
      },
      terra1skjr69exm6v8zellgjpaa2emhwutrk5a6dz7dd: {
        protocol: "Wormhole Binance USD",
        symbol: "wBUSD",
        token: "terra1skjr69exm6v8zellgjpaa2emhwutrk5a6dz7dd",
        icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/BUSDbs_wh.png",
        decimals: 8,
      },
      terra1kkyyh7vganlpkj0gkc2rfmhy858ma4rtwywe3x: {
        protocol: "Wormhole Polygon USDC",
        symbol: "wpoUSDC",
        token: "terra1kkyyh7vganlpkj0gkc2rfmhy858ma4rtwywe3x",
        icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/USDCpo_wh.png",
        decimals: 6,
      },
      terra1yg3j2s986nyp5z7r2lvt0hx3r0lnd7kwvwwtsc: {
        protocol: "Lido Staked LUNA",
        symbol: "stLUNA",
        token: "terra1yg3j2s986nyp5z7r2lvt0hx3r0lnd7kwvwwtsc",
        icon: "https://static.lido.fi/stLUNA/stLUNA.png",
        decimals: 6,
      },
      terra1t9ul45l7m6jw6sxgvnp8e5hj8xzkjsg82g84ap: {
        protocol: "Wormhole Wrapped stSOL",
        symbol: "wstSOL",
        token: "terra1t9ul45l7m6jw6sxgvnp8e5hj8xzkjsg82g84ap",
        icon: "https://static.lido.fi/stSOL/stSOL.png",
        decimals: 8,
      },
      terra133chr09wu8sakfte5v7vd8qzq9vghtkv4tn0ur: {
        protocol: "Wormhole Wrapped stETH",
        symbol: "wstETH",
        token: "terra133chr09wu8sakfte5v7vd8qzq9vghtkv4tn0ur",
        icon: "https://static.lido.fi/wstETH/wstETH.png",
        decimals: 8,
      },
      terra178v546c407pdnx5rer3hu8s2c0fc924k74ymnn: {
        protocol: "Nexus bETH",
        symbol: "nETH",
        token: "terra178v546c407pdnx5rer3hu8s2c0fc924k74ymnn",
        icon: "https://terra.nexusprotocol.app/nEth.svg",
        decimals: 6,
      },
      terra10f2mt82kjnkxqj2gepgwl637u2w4ue2z5nhz5j: {
        protocol: "Nexus bLUNA",
        symbol: "nLUNA",
        token: "terra10f2mt82kjnkxqj2gepgwl637u2w4ue2z5nhz5j",
        icon: "https://terra.nexusprotocol.app/nLuna.svg",
        decimals: 6,
      },
    },
    pairs: [
      // luna-ust
      {
        asset_infos: [
          {
            native_token: {
              denom: "uusd",
            },
          },
          {
            native_token: {
              denom: "uluna",
            },
          },
        ],
        contract_addr: "terra1m6ywlgn6wrjuagcmmezzz2a029gtldhey5k552",
        liquidity_token: "terra1m24f7k4g66gnh9f7uncp32p722v0kyt3q4l3u5",
        pair_type: {
          xyk: {},
        },
      },
      // bLuna-luna
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp",
            },
          },
          {
            native_token: {
              denom: "uluna",
            },
          },
        ],
        contract_addr: "terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w",
        liquidity_token: "terra1htw7hm40ch0hacm8qpgd24sus4h0tq3hsseatl",
        pair_type: {
          stable: {},
        },
      },
      // anc-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1qr2k6yjjd5p2kaewqvg93ag74k6gyjr7re37fs",
        liquidity_token: "terra1wmaty65yt7mjw6fjfymkd9zsm6atsq82d9arcd",
        pair_type: {
          xyk: {},
        },
      },
      // mir-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra143xxfw5xf62d5m32k3t4eu9s82ccw80lcprzl9",
        liquidity_token: "terra17trxzqjetl0q6xxep0s2w743dhw2cay0x47puc",
        pair_type: {
          xyk: {},
        },
      },
      // orion-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1mddcdx0ujx89f38gu7zspk2r2ffdl5enyz2u03",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1mxyp5z27xxgmv70xpqjk7jvfq54as9dfzug74m",
        liquidity_token: "terra1w80npmymwhdtvcmrg44xmqqdnufu3gyfaytr9z",
        pair_type: {
          xyk: {},
        },
      },
      // stt-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1m95udvvdame93kl6j2mk8d03kc982wqgr75jsr",
        liquidity_token: "terra14p4srhzd5zng8vghly5artly0s53dmryvg3qc6",
        pair_type: {
          xyk: {},
        },
      },
      // vkr-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1dy9kmlm4anr92e42mrkjwzyvfqwz66un00rwr5",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra15s2wgdeqhuc4gfg7sfjyaep5cch38mwtzmwqrx",
        liquidity_token: "terra1lw36qqz72mxajrfgkv24lahudq3ehmkpc305yc",
        pair_type: {
          xyk: {},
        },
      },
      // mine-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1kcthelkax4j9x8d3ny6sdag0qmxxynl3qtcrpy",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra134m8n2epp0n40qr08qsvvrzycn2zq4zcpmue48",
        liquidity_token: "terra16unvjel8vvtanxjpw49ehvga5qjlstn8c826qe",
        pair_type: {
          xyk: {},
        },
      },
      // psi-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra12897djskt9rge8dtmm86w654g7kzckkd698608",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1v5ct2tuhfqd0tf8z0wwengh4fg77kaczgf6gtx",
        liquidity_token: "terra1cspx9menzglmn7xt3tcn8v8lg6gu9r50d7lnve",
        pair_type: {
          xyk: {},
        },
      },
      // apollo-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra100yeqvww74h4yaejj6h733thgcafdaukjtw397",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1zpnhtf9h5s7ze2ewlqyer83sr4043qcq64zfc4",
        liquidity_token: "terra1zuktmswe9zjck0xdpw2k79t0crjk86fljv2rm0",
        pair_type: {
          xyk: {},
        },
      },
      // astro-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1l7xu2rl3c7qmtx3r5sd2tz25glf6jh8ul7aag7",
        liquidity_token: "terra17n5sunn88hpy965mzvt3079fqx3rttnplg779g",
        pair_type: {
          xyk: {},
        },
      },
      // wAVAX-luna
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1hj8de24c3yqvcsv9r8chr03fzwsak3hgd8gv3m",
            },
          },
          {
            native_token: {
              denom: "uluna",
            },
          },
        ],
        contract_addr: "terra16jaryra6dgfvkd3gqr5tcpy3p2s37stpa9sk7s",
        liquidity_token: "terra1pme6xgsr0f6sdcq5gm2qs8dsc2v0h6gqzs8js5",
        pair_type: {
          xyk: {},
        },
      },
      // wBNB-luna
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1cetg5wruw2wsdjp7j46rj44xdel00z006e9yg8",
            },
          },
          {
            native_token: {
              denom: "uluna",
            },
          },
        ],
        contract_addr: "terra1tehmd65kyleuwuf3a362mhnupkpza29vd86sml",
        liquidity_token: "terra1wk0lev7qneurzp2dzcauh2ktctwx6v079uvn7w",
        pair_type: {
          xyk: {},
        },
      },
      // wETH-luna
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra14tl83xcwqjy0ken9peu4pjjuu755lrry2uy25r",
            },
          },
          {
            native_token: {
              denom: "uluna",
            },
          },
        ],
        contract_addr: "terra1m32zs8725j9jzvva7zmytzasj392wpss63j2v0",
        liquidity_token: "terra1lmlv43teqcty6xldtg4f40sghnd2f8ehjz0qpk",
        pair_type: {
          xyk: {},
        },
      },
      // wSOL-luna
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra190tqwgqx7s8qrknz6kckct7v607cu068gfujpk",
            },
          },
          {
            native_token: {
              denom: "uluna",
            },
          },
        ],
        contract_addr: "terra16e5tgdxre44gvmjuu3ulsa64kc6eku4972yjp3",
        liquidity_token: "terra1x6jws8lh505gw7dl67a7qq077g9mn3cjj3v22r",
        pair_type: {
          xyk: {},
        },
      },
      // wMATIC-luna
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1dtqlfecglk47yplfrtwjzyagkgcqqngd5lgjp8",
            },
          },
          {
            native_token: {
              denom: "uluna",
            },
          },
        ],
        contract_addr: "terra1wr07qcmfqz2vxhcfr6k8xv8eh5es7u9mv2z07x",
        liquidity_token: "terra1n32fdqslpyug72zrcv8gwq37vjj0mxhy9p4g7z",
        pair_type: {
          xyk: {},
        },
      },
      // xdefi-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra169edevav3pdrtjcx35j6pvzuv54aevewar4nlh",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1476fucrvu5tuga2nx28r3fctd34xhksc2gckgf",
        liquidity_token: "terra1krvq5hk3a37yeydzfrgjj00d8xygk5um9jas8p",
        pair_type: {
          xyk: {},
        },
      },
      // weUSDC-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1pepwcav40nvj3kh60qqgrk8k07ydmc00xyat06",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1x0ulpvp6m46c5j7t40nj24mjp900954ys2jsnu",
        liquidity_token: "terra1lapdj4fcg936fpgdwewx55h7n79p4p9tzrg4lw",
        pair_type: {
          stable: {},
        },
      },
      // soUSDC-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1e6mq63y64zcxz8xyu5van4tgkhemj3r86yvgu4",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1cc6kqk0yl25hdpr5llxmx62mlyfdl7n0rwl3hq",
        liquidity_token: "terra1yf9hh2zrpydwqnqaw4p5hqfzzhgv49jj24prew",
        pair_type: {
          stable: {},
        },
      },
      // avUSDC-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1pvel56a2hs93yd429pzv9zp5aptcjg5ulhkz7w",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1qmxkqcgcgq8ch72k6kwu3ztz6fh8tx2xd76ws7",
        liquidity_token: "terra1hkm7w33fpmnruxka9tykfsntl4s692kwr8hj27",
        pair_type: {
          stable: {},
        },
      },
      // whBUSD-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1skjr69exm6v8zellgjpaa2emhwutrk5a6dz7dd",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1szt6cq52akhmzcqw5jhkw3tvdjtl4kvyk3zkhx",
        liquidity_token: "terra186cxwpreuzqm9nhmaltycxfyqxz379aef752qw",
        pair_type: {
          stable: {},
        },
      },
      // whUSDC-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1kkyyh7vganlpkj0gkc2rfmhy858ma4rtwywe3x",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1cevdyd0gvta3h79uh5t47kk235rvn42gzf0450",
        liquidity_token: "terra1m4j80w4lustnjhszqm9ltdvfmrfptlwcznek4a",
        pair_type: {
          stable: {},
        },
      },
      // stLUNA-luna
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1yg3j2s986nyp5z7r2lvt0hx3r0lnd7kwvwwtsc",
            },
          },
          {
            native_token: {
              denom: "uluna",
            },
          },
        ],
        contract_addr: "terra1gxjjrer8mywt4020xdl5e5x7n6ncn6w38gjzae",
        liquidity_token: "terra1h2lasu3a5207yt7decg0s09z5ltw953nrgj820",
        pair_type: {
          stable: {},
        },
      },
      // nLuna-psi
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra12897djskt9rge8dtmm86w654g7kzckkd698608",
            },
          },
          {
            token: {
              contract_addr: "terra10f2mt82kjnkxqj2gepgwl637u2w4ue2z5nhz5j",
            },
          },
        ],
        contract_addr: "terra10lv5wz84kpwxys7jeqkfxx299drs3vnw0lj8mz",
        liquidity_token: "terra1t53c8p0zwvj5xx7sxh3qtse0fq5765dltjrg33",
        pair_type: {
          xyk: {},
        },
      },
      // nEth-psi
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra12897djskt9rge8dtmm86w654g7kzckkd698608",
            },
          },
          {
            token: {
              contract_addr: "terra178v546c407pdnx5rer3hu8s2c0fc924k74ymnn",
            },
          },
        ],
        contract_addr: "terra18hjdxnnkv8ewqlaqj3zpn0vsfpzdt3d0y2ufdz",
        liquidity_token: "terra1pjfqacx7k6dg63v2h5q96zjg7w5q25093wnkjc",
        pair_type: {
          xyk: {},
        },
      },
      // stSOL-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1t9ul45l7m6jw6sxgvnp8e5hj8xzkjsg82g84ap",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra18dq84qfpz267xuu0k47066svuaez9hr4xvwlex",
        liquidity_token: "terra1cgvlpz6vltqa49jlj3yr2ddnwy22xw62k4433t",
        pair_type: {
          xyk: {},
        },
      },
      // stETH-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra133chr09wu8sakfte5v7vd8qzq9vghtkv4tn0ur",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1edurrzv6hhd8u48engmydwhvz8qzmhhuakhwj3",
        liquidity_token: "terra1qz4cv5lsfw4k2266q52z9rtz64n58paxy9d476",
        pair_type: {
          xyk: {},
        },
      },
    ],
  },
  testnet: {
    tokens: {
      terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x: {
        protocol: "Terra Bonded Luna",
        symbol: "bLUNA",
        token: "terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x",
        icon: "https://whitelist.anchorprotocol.com/logo/bLUNA.png",
        decimals: 6,
      },
      terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc: {
        protocol: "Anchor",
        symbol: "ANC",
        token: "terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc",
        icon: "https://whitelist.anchorprotocol.com/logo/ANC.png",
        decimals: 6,
      },
      terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u: {
        protocol: "Mirror",
        symbol: "MIR",
        token: "terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u",
        icon: "https://whitelist.mirror.finance/icon/MIR.png",
        decimals: 6,
      },
      terra1a8hskrwnccq0v7gq3n24nraaqt7yevzy005uf5: {
        protocol: "Valkyrie",
        symbol: "VKR",
        token: "terra1a8hskrwnccq0v7gq3n24nraaqt7yevzy005uf5",
        icon: "https://app.valkyrieprotocol.com/icon_vkr.png",
        decimals: 6,
      },
      terra18nle009rtynpjgleh2975rleu5zts0zdtqryte: {
        protocol: "Nexus",
        symbol: "PSI",
        token: "terra18nle009rtynpjgleh2975rleu5zts0zdtqryte",
        icon: "https://terra.nexusprotocol.app/assets/psi.png",
        decimals: 6,
      },
      terra13qdskca8xavmed88htplse0z396tesgh63tn9r: {
        protocol: "Orion",
        symbol: "ORION",
        token: "terra13qdskca8xavmed88htplse0z396tesgh63tn9r",
        icon: "https://orion.money/assets/ORION-LOGO-2.1-GREEN@256x256.png",
        decimals: 8,
      },
      terra1lqm5tutr5xcw9d5vc4457exa3ghd4sr9mzwdex: {
        protocol: "Pylon",
        symbol: "MINE",
        token: "terra1lqm5tutr5xcw9d5vc4457exa3ghd4sr9mzwdex",
        icon: "https://assets.pylon.rocks/logo/MINE.png",
        decimals: 6,
      },
      terra1a0dx9xeh7sh6amn69zxg35twvdm44cghrlh87d: {
        protocol: "Apollo",
        symbol: "APOLLO",
        token: "terra1a0dx9xeh7sh6amn69zxg35twvdm44cghrlh87d",
        icon: "https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png",
        decimals: 6,
      },
      terra1e42d7l5z5u53n7g990ry24tltdphs9vugap8cd: {
        protocol: "Lido Staked LUNA",
        symbol: "stLUNA",
        token: "terra1e42d7l5z5u53n7g990ry24tltdphs9vugap8cd",
        icon: "https://static.lido.fi/stLUNA/stLUNA.png",
        decimals: 6,
      },
      terra1szee0j4m8c75etfs9le9tepa4mc80t3vpf72ls: {
        protocol: "StarTerra",
        symbol: "STT",
        token: "terra1szee0j4m8c75etfs9le9tepa4mc80t3vpf72ls",
        icon: "https://starterra.io/assets/100x100_starterra.png",
        decimals: 6,
      },
      terra186tpamwvve5c7dhymrmk2r3zz3ynnurhupd7p9: {
        protocol: "xDEFI",
        symbol: "XDEFI",
        token: "terra186tpamwvve5c7dhymrmk2r3zz3ynnurhupd7p9",
        icon: "/tokens/xdefi.svg",
        decimals: 8,
      },
      terra1hp84qsfk6qv0x2en8hdul3370a79qk90e59a5v: {
        protocol: "Wormhole Wrapped stETH",
        symbol: "wstETH",
        token: "terra1hp84qsfk6qv0x2en8hdul3370a79qk90e59a5v",
        icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/stETH_wh.png",
        decimals: 8,
      },
      terra1lty87kmhht8hr0q5w62uszhs2sk85evwtyv6hy: {
        protocol: "Wormhole Wrapped stSOL",
        symbol: "wstSOL",
        token: "terra1lty87kmhht8hr0q5w62uszhs2sk85evwtyv6hy",
        icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/SOL_wh.png",
        decimals: 8,
      },
      terra1em8dvzln8quptj9tuptf8tu73jyuv5jn6kqdwv: {
        protocol: "Nexus bETH",
        symbol: "nETH",
        token: "terra1em8dvzln8quptj9tuptf8tu73jyuv5jn6kqdwv",
        icon: "https://terra.nexusprotocol.app/nEth.svg",
        decimals: 6,
      },
      terra1gzq2zd4skvnvgm2z48fdp0mxy2djmtk7sz4uhe: {
        protocol: "Nexus bLUNA",
        symbol: "nLUNA",
        token: "terra1gzq2zd4skvnvgm2z48fdp0mxy2djmtk7sz4uhe",
        icon: "https://terra.nexusprotocol.app/nLuna.svg",
        decimals: 6,
      },
      terra1azu2frwn9a4l6gl5r39d0cuccs4h7xlu9gkmtd: {
        protocol: "Kujira",
        symbol: "KUJI",
        token: "terra1azu2frwn9a4l6gl5r39d0cuccs4h7xlu9gkmtd",
        icon: "https://assets.kujira.app/kuji.png",
        decimals: 6,
      },
      terra1jqcw39c42mf7ngq4drgggakk3ymljgd3r5c3r5: {
        protocol: "Astroport",
        symbol: "ASTRO",
        token: "terra1jqcw39c42mf7ngq4drgggakk3ymljgd3r5c3r5",
        icon: "/tokens/astro.png",
        decimals: 6,
      },
      terra1qpwzk9s9g4jzaqe923w6ym2masuuc7hzz5dv6g: {
        protocol: "Astroport",
        symbol: "xASTRO",
        token: "terra1qpwzk9s9g4jzaqe923w6ym2masuuc7hzz5dv6g",
        icon: "/tokens/xAstro.png",
        decimals: 6,
      },
      uluna: {
        protocol: "Terra",
        symbol: "LUNA",
        token: "uluna",
        icon: "https://assets.terra.money/icon/60/Luna.png",
      },
      uusd: {
        protocol: "Terra USD",
        symbol: "UST",
        token: "uusd",
        icon: "https://assets.terra.money/icon/60/UST.png",
      },
    },
    pairs: [
      // luna-ust
      {
        asset_infos: [
          {
            native_token: {
              denom: "uluna",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1e49fv4xm3c2znzpxmxs0z2z6y74xlwxspxt38s",
        liquidity_token: "terra1dqjpcqej9nxej80u0p56rhkrzlr6w8tp7txkmj",
        pair_type: {
          xyk: {},
        },
      },
      // bluna-luna
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x",
            },
          },
          {
            native_token: {
              denom: "uluna",
            },
          },
        ],
        contract_addr: "terra1esle9h9cjeavul53dqqws047fpwdhj6tynj5u4",
        liquidity_token: "terra14e7z2ll6eweq6cxe6qkvl28hatapmw2uflxcyt",
        pair_type: {
          stable: {},
        },
      },
      // anc-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra13r3vngakfw457dwhw9ef36mc8w6agggefe70d9",
        liquidity_token: "terra1agu2qllktlmf0jdkuhcheqtchnkppzrl4759y6",
        pair_type: {
          xyk: {},
        },
      },
      // mir-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1xrt4j56mkefvhnyqqd5pgk7pfxullnkvsje7wx",
        liquidity_token: "terra1efmcf22aweaj3zzjhzgyghv88dda0yk4j9jp29",
        pair_type: {
          xyk: {},
        },
      },
      // vkr-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1a8hskrwnccq0v7gq3n24nraaqt7yevzy005uf5",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra168jy6ej8rm2kf8wtygavpqq5fpc5ewq39xe36a",
        liquidity_token: "terra1qrpflfyte76cvxdj8tftj2qvat47aus38h58p4",
        pair_type: {
          xyk: {},
        },
      },
      // psi-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra18nle009rtynpjgleh2975rleu5zts0zdtqryte",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1a7vcghx2vjyg74nqk5krd9ppa8ks8ytz5vdsgp",
        liquidity_token: "terra1zv9uhshhuw6yr4m95nx54cpl0g4ahska5uwfv8",
        pair_type: {
          xyk: {},
        },
      },
      // orion-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra13qdskca8xavmed88htplse0z396tesgh63tn9r",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1yw0vertt9yzpr2nzwtduau3qnrje46uzksqjft",
        liquidity_token: "terra1nzmdsg20gd04cxzmvmzg0zglvz5yan3fmzg9t8",
        pair_type: {
          xyk: {},
        },
      },
      // stt-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1szee0j4m8c75etfs9le9tepa4mc80t3vpf72ls",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra13sn4xx9s2k7q26xju5zy99j2n8pfhlt2a5yccx",
        liquidity_token: "terra159xnereggxkfdswssheajdkr6n569q6hffl5p6",
        pair_type: {
          xyk: {},
        },
      },
      // mine-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1lqm5tutr5xcw9d5vc4457exa3ghd4sr9mzwdex",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1hh20kjfz4yaqkyfwfd2n8ktwnr956m82r9lqd4",
        liquidity_token: "terra1neqsjj9dq6lfu6xmrsn06mrzrttax0glfa7f92",
        pair_type: {
          xyk: {},
        },
      },
      // astro-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1jqcw39c42mf7ngq4drgggakk3ymljgd3r5c3r5",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1ec0fnjk2u6mms05xyyrte44jfdgdaqnx0upesr",
        liquidity_token: "terra18zjm4scu5wqlskwafclxa9kpa9l3zrvju4vdry",
        pair_type: {
          xyk: {},
        },
      },
      // kuji-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1azu2frwn9a4l6gl5r39d0cuccs4h7xlu9gkmtd",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra178na9upyad7gu4kulym9uamwafgrf922yln76l",
        liquidity_token: "terra1mdgq0fyr69m5880q909ts598e0qlevj543shr4",
        pair_type: {
          xyk: {},
        },
      },
      // stLuna-luna
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1e42d7l5z5u53n7g990ry24tltdphs9vugap8cd",
            },
          },
          {
            native_token: {
              denom: "uluna",
            },
          },
        ],
        contract_addr: "terra1cx2rqwsgsdhg3t9ce3kef33dncaswknemucrzf",
        liquidity_token: "terra1w50p86452w5l9xmpa67nrga4umxvp5u749cfpp",
        pair_type: {
          stable: {},
        },
      },
      // apollo-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1a0dx9xeh7sh6amn69zxg35twvdm44cghrlh87d",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1af47e4tl5gapkqr45vvxx7nygg5f9qkecjvpdm",
        liquidity_token: "terra12ekyxay62wa5zq8tcgqysw83hvtfs9qhe9j66v",
        pair_type: {
          xyk: {},
        },
      },
      // xdefi-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra186tpamwvve5c7dhymrmk2r3zz3ynnurhupd7p9",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1zyc39h9d6tjf7e84xpw0wpuhg02sfnju3my6vl",
        liquidity_token: "terra1tcctmat9yu23grgczpyeynl83echgvlc4uvzmg",
        pair_type: {
          xyk: {},
        },
      },
      // wewstETH-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1hp84qsfk6qv0x2en8hdul3370a79qk90e59a5v",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1zsvarphwyzlgjwx9xty0rezla9l7s0p5qd87pu",
        liquidity_token: "terra1mn8xw7ksu9wc38m4rnvdu9nu36ntur26gat4wj",
        pair_type: {
          xyk: {},
        },
      },
      // wewstSOL-ust
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1lty87kmhht8hr0q5w62uszhs2sk85evwtyv6hy",
            },
          },
          {
            native_token: {
              denom: "uusd",
            },
          },
        ],
        contract_addr: "terra1prwpl8h63l8nex58clk25wd4zpu0rvfuz2dvh4",
        liquidity_token: "terra1pmratq75tq4wtp36sedtl3g5awm9vt4ac9udhl",
        pair_type: {
          xyk: {},
        },
      },
      // nETH-psi
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1em8dvzln8quptj9tuptf8tu73jyuv5jn6kqdwv",
            },
          },
          {
            token: {
              contract_addr: "terra18nle009rtynpjgleh2975rleu5zts0zdtqryte",
            },
          },
        ],
        contract_addr: "terra1mt63aef37fx9z7jfadtgk8a5swxlxce9pjdgvy",
        liquidity_token: "terra1dpzuan9dyp20ze7ttfv4n6vwjl9k0j9nppzq2s",
        pair_type: {
          xyk: {},
        },
      },
      // nLuna-psi
      {
        asset_infos: [
          {
            token: {
              contract_addr: "terra1gzq2zd4skvnvgm2z48fdp0mxy2djmtk7sz4uhe",
            },
          },
          {
            token: {
              contract_addr: "terra18nle009rtynpjgleh2975rleu5zts0zdtqryte",
            },
          },
        ],
        contract_addr: "terra1uwf0yn9rnt7anpceqm7s00zfgevnwaaqde2eee",
        liquidity_token: "terra1kyjspjr054v00nw7g2fttk6fq9furq9wjsy0x2",
        pair_type: {
          xyk: {},
        },
      },
    ],
  },
};

export default whitelist;

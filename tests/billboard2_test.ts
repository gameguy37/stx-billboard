
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.5.4/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that setting message requires a price",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        // arrange: set up the chain, state, and other required elements
        let wallet_1 = accounts.get("wallet_1")!;
        let assetMaps = chain.getAssetsMaps();
        const balance = assetMaps.assets['STX'][wallet_1.address];

        // act: perform actions related to the current test
        let block = chain.mineBlock([
            Tx.contractCall('billboard2', 'set-message', [types.utf8("testing")], wallet_1.address),
            Tx.contractCall('billboard2', 'get-message', [], wallet_1.address)
        ]);

        // assert: review returned data, contract state, and other requirements
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 2);

        // TODO
        block.receipts[1].result
            .expectUtf8('testing');

        assetMaps = chain.getAssetsMaps();
        assertEquals(assetMaps.assets['STX'][wallet_1.address], balance - 100);
    },
});

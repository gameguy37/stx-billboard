
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.5.4/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that setting and getting message works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        // arrange: set up the chain, state, and other required elements
        let wallet_1 = accounts.get("wallet_1")!;

        // act: perform actions related to the current test
        let block = chain.mineBlock([
            Tx.contractCall('billboard1', 'get-message', [], wallet_1.address),
            Tx.contractCall('billboard1', 'set-message', [types.utf8("testing")], wallet_1.address),
            Tx.contractCall('billboard1', 'get-message', [], wallet_1.address),
        ]);

        // assert: review returned data, contract state, and other requirements
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 2);

        // TODO
        block.receipts[0].result
            .expectUtf8("Hello World!");

        block.receipts[2].result
            .expectUtf8("testing");
    },
});

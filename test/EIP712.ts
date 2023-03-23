import { expect } from "chai";
import { ethers } from "hardhat";

describe("EIP712", function(){
    async function deployEIP712(){
        const EIP712 = await ethers.getContractFactory("EIP712");
        const eip712 = await EIP712.deploy("PermitToken", "PTN");

        return eip712;
    }

    it("Get hashStruct", async ()=>{
        const eip712 = await deployEIP712();

        const hashedPotato = await eip712.hashStruct({
            from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            to: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            amount: 1000,
        });

        console.log(hashedPotato);
        expect(hashedPotato).exist;
    })

    it("Get Digest", async ()=>{
        const eip712 = await deployEIP712();
        console.log(`Deployd at ${eip712.address}`);

        const signature = "d6d88062f4e26c9b64814cd0000868e20b15791f5caff373fc89480d2f987e7b5ab2bdebb0506944946a0f8cbfacbd31dd094d87f7dcd196daa01fdb3ca877d01c"

        const r = "0x" + signature.substring(0, 64);
        const s = "0x" + signature.substring(64,128);
        const v = parseInt(signature.substring(128, 130), 16);
        
        console.log(`r: ${r}`);
        console.log(`s: ${s}`);
        console.log(`v: ${v}`);

        const digest = await eip712.permit(
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            1000,
            v, r, s
        );

        console.log(digest);
        expect(digest).exist;
    })
})
const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const body = JSON.parse(event.body || "{}");
    const action = body.action;

    // 🔥 MINT NFT (SIMULATED)
    if(action === "mint"){

      const { user, catalog_id } = body;

      const { data } = await client
        .from("fake_nfts")
        .insert([{
          owner: user,
          catalog_id
        }])
        .select()
        .single();

      return {
        statusCode:200,
        body: JSON.stringify({
          success:true,
          nft: data
        })
      };
    }

    // 🔥 TRANSFER NFT (SIMULATED)
    if(action === "transfer"){

      const { nft_id, to } = body;

      await client
        .from("fake_nfts")
        .update({ owner: to })
        .eq("id", nft_id);

      return {
        statusCode:200,
        body: JSON.stringify({ success:true })
      };
    }

    // 🔥 GET USER NFTs
    if(action === "my_nfts"){

      const { user } = body;

      const { data } = await client
        .from("fake_nfts")
        .select("*")
        .eq("owner", user);

      return {
        statusCode:200,
        body: JSON.stringify(data || [])
      };
    }

    return {
      statusCode:200,
      body: JSON.stringify({ error:"invalid action" })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};

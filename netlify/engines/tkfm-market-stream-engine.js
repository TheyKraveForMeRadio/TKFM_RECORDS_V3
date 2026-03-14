import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Access-Control-Allow-Origin": "*"
  }

  const stream = new ReadableStream({
    async start(controller){

      async function pushUpdate(){

        try{

          const { data: tokens } = await supabase
          .from("catalog_tokens")
          .select("*")

          const { data: trades } = await supabase
          .from("trades")
          .select("*")
          .order("created_at",{ascending:false})
          .limit(10)

          let marketCap = 0

          for(const t of tokens || []){
            marketCap +=
            Number(t.price || 0) *
            Number(t.total_supply || 0)
          }

          const payload = {

            market_cap:marketCap,
            catalog_size:tokens?.length || 0,
            recent_trades:trades || [],
            timestamp:new Date()

          }

          controller.enqueue(
            `data: ${JSON.stringify(payload)}\n\n`
          )

        }catch(e){

          controller.enqueue(
            `data: ${JSON.stringify({error:e.message})}\n\n`
          )

        }

      }

      setInterval(pushUpdate,3000)

    }
  })

  return new Response(stream,{headers})

}

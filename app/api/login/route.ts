
export const POST = async (req: Request) => {
    
    if (req.method == "POST"){
        const { username, password } = await req.json();
        
        try {
            if (username == process.env.LOGINUSERNAME && password == process.env.LOGINPASSWORD){
                // return res.status(200).json({ message: 'خوش آمدید' });
                return new Response(JSON.stringify({'message':'خوش آمدید'}), {status: 200})
            } else {
                // return res.status(400).json({ message: 'کاربر پیدا نشد' });
                return new Response(JSON.stringify({'message':'کاربر پیدا نشد'}), {status: 400})
            }
            
        } catch (error) {
            console.log("there is an error: ",error)
            // return res.status(500).json({ message: 'خطایی رخ داد لطفا مجدد تلاش کنید' });
            return new Response(JSON.stringify({'message':'خطایی رخ داد لطفا مجدد تلاش کنید'}), {status: 500})
        }
    }
}

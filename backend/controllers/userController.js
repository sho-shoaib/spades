const User = require('../Models/User');

module.exports.signup = async(req, res)=>{
    const {name, email, password } = req.body;
    const {balance} = 100000

    let user = null;
    console.log({ name, email, balance , password })
    try {
        user = new User({ name, email, balance , password });
        await user.save();
        res.status(201).json(user);
        } catch (err) {console.log(err); return res.status(500)}
    }

module.exports.login = async(req, res)=> {
        const{email, password} = req.body;
        console.log('POST /login'+ " API Call fromc" + email);
        try{
            const user = await User.findOne(
                { email },
                'email password name balance eth'
              );
              if (!user) {
                return res
                  .status(404)
                  .send({ error: 'Could not find a user with that username.' });
              }

              if (user){
                if(user.password == password){
                  console.log(200)
                    return res
                    .status(200)
                    .send({         
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                        eth: user.eth,
                      balance: user.balance})
                } else {
                  console.log(500)
                  return res
                  .status(500)
                  .send({msg: "Wrong Password"})
                }
              }
        } catch(err){return res.status(500).send({error: err})}
    }

module.exports.makeBet = async(req, res)=>{
    const{email, amount} = req.body;
    console.log(req.body)
    try{
        const user = await User.findOne(
            { email },
            'email balance'
          );

          const admin = await User.findOne(
            { email: "admin@spades.com" },
            'email balance'
          )
          if (!user) {
            return res
              .status(404)
              .send({ error: 'Could not find a user with that username.' });
          }

          if (user){
            if(amount>user.balance){
                return res.status(303).send("Bet amount higher than your balance")
            } else {
            user.balance = user.balance - amount;
            await user.save();
            admin.balance = admin.balance + amount;
            await admin.save();
            return res.status(200).send("Bet Successfull")
            }
            }
            if(!user){
              return res.status(500).send({msg: "No User with that email"})
            }
          } catch(err){return res.status(500).send({error: err})}
}

module.exports.givewin = async(req, res)=>{
    const{email, amount} = req.body;
    console.log(req.body)
    try{
        const user = await User.findOne(
            { email },
            'email balance'
          );

          const admin = await User.findOne(
            { email: "admin@spades.com" },
            'email balance'
          )
          if (!user) {
            return res
              .status(404)
              .send({ error: 'Could not find a user with that username.' });
          }

          if (user){
            if(amount>admin.balance){
                return res.status(303).send("Wining Amount is higher than the pool balance")
            } else {
            user.balance = user.balance + amount;
            await user.save();
            admin.balance = admin.balance - amount;
            await admin.save();
            return res.status(200).send("Winning Amount Deposited Successful")
            }
            }
          } catch(err){return res.status(500).send({error: err})}
}

module.exports.getBalance = async(req, res)=>{
  const { email } = req.params;
  try{
    const user = await User.findOne(
      { email },
      'email balance eth bnb matic busd usdt usdc wbnb wsol'
    );
    return res.status(200).send({balance: user.balance,
    eth: user.eth,
    bnb: user.bnb,
    matic: user.matic,
    busd: user.busd,
    usdt: user.usdt,
    usdc: user.usdc,
    wbnb: user.wbnb,
    wsol: user.wsol,
  })
  } catch(err){
    return res.status(500).send("Caught Error in finding user")
  }
}

module.exports.addBalance = async(req, res)=>{
  const{email, amount, type} = req.body;
  console.log(req.body);
  const currency = type.toLowerCase()
  try{
      const user = await User.findOne(
          { email },
          'email balance eth bnb matic busd usdt usdc wbnb wsol'
        );
        console.log(user)
        if (!user) {
          return res
            .status(404)
            .send({ error: 'Could not find a user with that username.' });
        }
        else
        {
          user[currency]+=amount;
          user.save()
          return res.status(200).send({user})
          
        }
        } catch(err){return res.status(500).send({error: err})}
}

module.exports.withdrawBalance = async(req, res)=>{
  const{email, amount, type} = req.body;
  console.log(req.body)
  try{
      const user = await User.findOne(
          { email },
          'email balance eth bnb matic busd usdt usdc wbnb wsol'
        );

        if (!user) {
          return res
            .status(404)
            .send({ error: 'Could not find a user with that username.' });
        }

        {
          user.type = user.type - amount;
          await user.save();
         return res.status(200).send("Amount Withdrawn Successfully");
          }
          
        } catch(err){return res.status(500).send({error: err})}

}
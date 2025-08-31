const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}


export default asyncHandler;


/* **************************************************************************************
1) Without async handler the controller must catch the error via try-catch blocks:

router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error("User not found");
    res.json(user);
  } catch (err) {
    next(err); // devi ricordarti sempre di farlo
  }
});


2) With async hadler that handler the any error is catched via catch(err) that is equal to .catch(err => next(err)).

router.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); // se fallisce, intercettato dal wrapper
  if (!user) throw new Error("User not found");    // intercettato dal wrapper
  res.json(user);
}));
************************************************************************************** */
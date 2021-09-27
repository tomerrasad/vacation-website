const router = require("express").Router();
const vu = require("../helpers/verifyUser");
let { execute } = require("../connection/dal");

router.get("/vacations/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const ids = await execute(
      `SELECT vacationid from brige WHERE userid=${id}`
    );
    const vacations =
      await execute(`SELECT vacation.* ,count(distinct brige.userid) as followers 
        FROM vacation left join brige 
        on vacation.id = brige.vacationid left join users 
        on brige.userid = users.id group by id ORDER BY place ASC`);
    return res
      .status(200)
      .send({ vacations, ids: ids.map((i) => i["vacationid"]) });
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.get("/getfollows/:id", vu, async (res, req) => {
  try {
    const getFollows = await execute(
      `SELECT count(vacationid) FROM brige WHERE vacationid=${req.params.id}`
    );
    return res.status(200).send(getFollows);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/follow", async (req, res) => {
  const { vacationId, userId } = req.body;
  try {
    await execute(
      `INSERT INTO brige(userid,vacationid) VALUES('${userId}','${vacationId}')`
    );
    const ids = await execute(
      `SELECT vacationid from brige WHERE userid=${userId}`
    );
    const vacations =
      await execute(`SELECT vacation.* ,count(distinct brige.userid) as followers 
    FROM vacation left join brige 
    on vacation.id = brige.vacationid left join users 
    on brige.userid = users.id group by id ORDER BY place ASC;
    `);
    return res
      .status(200)
      .send({ ids: ids.map((i) => i["vacationid"]), vacations });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});
router.delete("/unfollow", async (req, res) => {
  const { vacationId, userId } = req.body;
  try {
    await execute(
      `DELETE FROM brige WHERE vacationid=${vacationId} AND userid=${userId}`
    );
    const ids = await execute(
      `SELECT vacationid from brige WHERE userid=${userId}`
    );
    const vacations = await execute(
      `SELECT vacation.* ,count(distinct brige.userid) as followers 
      FROM vacation left join brige 
      on vacation.id = brige.vacationid left join users 
      on brige.userid = users.id group by id ORDER BY place ASC`
    );
    return res
      .status(200)
      .send({ ids: ids.map((i) => i["vacationid"]), vacations });
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.post("/addvacation", async (req, res) => {
  const { tripdescription, place, fromdate, todate, price, img } = req.body;
  try {
    await execute(
      `INSERT INTO vacation(tripdescription,place,fromdate,todate,price,img) VALUES('${tripdescription}','${place}','${fromdate}','${todate}','${price}','${img}')`
    );
    const newvacations =
      await execute(`SELECT vacation.* ,count(distinct brige.userid) as followers 
    FROM vacation left join brige 
    on vacation.id = brige.vacationid left join users 
    on brige.userid = users.id group by id ORDER BY place ASC`);
    return res.status(200).send({ some: newvacations });
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.put("/editvacation", async (req, res) => {
  const { id, tripdescription, place, fromdate, todate, price, img } = req.body;
  try {
    await execute(
      `UPDATE vacation SET tripdescription = '${tripdescription}',place ='${place}',fromdate='${fromdate}',todate='${todate}',price='${price}',img='${img}' WHERE id=${id}`
    );

    const updatedVacations =
      await execute(`SELECT vacation.* ,count(distinct brige.userid) as followers 
    FROM vacation left join brige 
    on vacation.id = brige.vacationid left join users 
    on brige.userid = users.id group by id ORDER BY place ASC`);
    return res.status(200).send({ some: updatedVacations });
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.delete("/removevacation", async (req, res) => {
  const { vacationId } = req.body;
  try {
    await execute(`DELETE FROM vacation WHERE id=${vacationId}`);

    const updatedVacations =
      await execute(`SELECT vacation.* ,count(distinct brige.userid) as followers 
    FROM vacation left join brige 
    on vacation.id = brige.vacationid left join users 
    on brige.userid = users.id group by id ORDER BY place ASC`);
    return res.status(200).send(updatedVacations);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = router;

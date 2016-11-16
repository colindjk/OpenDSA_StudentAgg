# Users per day
select
    date(created_at) as day_of,
    COUNT(distinct user_id) as num_users_day
from
	opendsa.odsa_user_interactions
group by DAYOFYEAR(action_time);

# Attempts per day, num_correct per day
select
    date(time_done) as day_of,
    count(*) num_attempts,
    count(case when correct = 1 then 1 else null end) as num_correct
from
	opendsa.odsa_exercise_attempts
group by dayofyear(time_done);

# User per day
#select user_id,created_at,os_family
#from opendsa.odsa_user_interactions
#where user_id in
#	(
#		select min(unix_timestamp(created_at))
#			from opendsa.odsa_user_interactions
#		group by os_family
#	)
#;

select
	#dayofyear(time_done) as day_of,
    user_id,
	count(*) num_attempts,
    count(case when correct = 1 then 1 else null end) as num_correct
from
	opendsa.odsa_exercise_attempts
group by dayofyear(time_done);

# select * from opendsa.odsa_exercise_attempts

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Workoutdetails from "../../components/WorkoutDetails/Workoutdetails";
import Workoutform from "../../components/WorkoutForm/Workoutform";
import { useWorkoutsContext } from "../../hooks/WorkoutsContextHook";

function Indexpage() {
  const { workouts, dispatch } = useWorkoutsContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const userWorkouts = workouts?.filter(
    (workout) => workout.owner === user?.email
  );

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        "https://workout-buddy-backend-kash.onrender.com"
      );
      const { msg } = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: msg });
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return user ? (
    <div className="home">
      <div className="workouts">
        {userWorkouts &&
          userWorkouts.map((workout) => (
            <Workoutdetails
              key={workout._id}
              workout={workout}
            ></Workoutdetails>
          ))}
      </div>
      <Workoutform></Workoutform>
    </div>
  ) : (
    navigate("/auth")
  );
}

export default Indexpage;

import "./App.css";
import React, { useState, useEffect } from "react";
import { Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cpus from "./components/Cpus";
import Cases from "./components/Cases";
import CpuCoolers from "./components/Cpucoolers";
import Gpus from "./components/Gpus";
import Memories from "./components/Memories";
import Motherboards from "./components/Motherboards";
import Psus from "./components/Psus";
import Storages from "./components/Storages";
import Components from "./components/Components";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import UsersAdmin from "./components/UsersAdmin";
import DashboardAdmin from "./components/DashboardAdmin";
import ComponentsAdmin from "./components/ComponentsAdmin";
import ComputerWizard from "./components/ComputerWizard";
import { handleSignout, handleSignup, handleSignin, checkIfSignedIn, refreshProfile, useFetchAllData, useFetchAllUsers, handleCredentialChange, handleCredentialChangeAdmin, handleComponentAddAdmin, handleComponentChangeAdmin, handleSignupAdmin, handleComponentDeleteAdmin, handleComputerWizard } from "./api";


const App = () => {
	// Use useFetchAllData() to fetch all component data, allowing it to be done in just one line
	const { cases, cpus, cpuCoolers, gpus, memories, motherboards, psus, storages } = useFetchAllData();
	const users = useFetchAllUsers();
	const [currentUser, setCurrentUser] = useState(null);

	// Check if the user is signed in on page load
	const fetchUserStatus = async () => {
		try {
			// Initialize currentUser with user data
			const userData = await checkIfSignedIn();
			if (userData) {
				// Refresh profile
				const refreshedUserData = await refreshProfile();
				setCurrentUser(refreshedUserData);
			} else {
				setCurrentUser(null);
			}
		} catch (error) {
			console.error("Error fetching user status:", error);
			setCurrentUser(null);
		}
	};
	useEffect(() => {
		fetchUserStatus();
	}, []);

	const handleUserChange = (event) => {
		setCurrentUser(event);
	};
	
	const refreshProfileData = async () => {
		const refreshedUserData = await refreshProfile();
		setCurrentUser(refreshedUserData);
		
	}

console.log("currentuser in app.js", currentUser);

  return (
	<div className="App">

	 {/* For all routes, including navbar, add the prop currentUser */}
	 {/* For navbar, add serCurrentUser for sign out */}
	<Navbar currentUser={currentUser} setCurrentUser={handleUserChange} handleSignout={handleSignout} />
	  <Routes>
		{/* For each route add the appropriate component prop */}
		<Route index element={<Home currentUser={currentUser} />} />
		<Route path="cpu" element={<Cpus cpus={cpus} currentUser={currentUser} />} />
		<Route path="cases" element={<Cases cases={cases} currentUser={currentUser} />} />
		<Route path="cpuCoolers" element={<CpuCoolers cpuCoolers={cpuCoolers} currentUser={currentUser} />} />
		<Route path="gpus" element={<Gpus gpus={gpus} currentUser={currentUser} />} />
		<Route path="memories" element={<Memories memories={memories} currentUser={currentUser} />} />
		<Route path="motherboards" element={<Motherboards motherboards={motherboards} currentUser={currentUser} />} />
		<Route path="psus" element={<Psus psus={psus} currentUser={currentUser} />} />
		<Route path="storages" element={<Storages storages={storages} currentUser={currentUser} />} />
		<Route path="components" element={<Components cases={cases} cpus={cpus} cpuCoolers={cpuCoolers} gpus={gpus} memories={memories} motherboards={motherboards} psus={psus} storages={storages} currentUser={currentUser} />} />


	  {currentUser && currentUser.isAdmin && (
		<Route path="admin" element={<Admin currentUser={currentUser} />}>
			<Route index element={<DashboardAdmin currentUser={currentUser} />} />
			<Route path="users" element={<UsersAdmin currentUser={currentUser} users={users} handleCredentialChangeAdmin={handleCredentialChangeAdmin} handleSignupAdmin={handleSignupAdmin} />} />
			<Route path="components" element={<ComponentsAdmin currentUser={currentUser} handleComponentAddAdmin={handleComponentAddAdmin} handleComponentChangeAdmin={handleComponentChangeAdmin} handleComponentDeleteAdmin={handleComponentDeleteAdmin} chassis={cases} cpus={cpus} cpuCoolers={cpuCoolers} gpus={gpus} memories={memories} motherboards={motherboards} psus={psus} storages={storages} />} />
		</Route>
		)}
		{currentUser ? (
			<>
			<Route path="computerwizard" element={<ComputerWizard currentUser={currentUser} handleComputerWizard={handleComputerWizard} refreshProfileData={refreshProfileData} />} />
			<Route path="profile" element={<Profile currentUser={currentUser} setCurrentUser={handleUserChange} handleCredentialChange={handleCredentialChange} handleSignout={handleSignout} refreshProfileData={refreshProfileData} />} />
			</>
		):(
			<>
			<Route path="signup" element={<Signup handleSignup={handleSignup} />} />
			<Route path="Signin" element={<Signin setCurrentUser={handleUserChange} currentUser={currentUser} handleSignin={handleSignin} checkIfSignedIn={checkIfSignedIn}/>} />
			</>
		)}

	  </Routes>
	<Footer />
	</div>
  );
}

export default App;

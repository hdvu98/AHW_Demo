import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: "AIzaSyDuqGL3-eHl4KPBG-Tcd1s9ScGTvvrrDjw",
    authDomain: "sbs-demo-e5c37.firebaseapp.com",
    databaseURL: "https://sbs-demo-e5c37.firebaseio.com",
    projectId: "sbs-demo",
    storageBucket: "sbs-demo.appspot.com",
    messagingSenderId: "906446847988",
    // appId: "1:906446847988:web:325b4dd88486c360fd43a1",
    // measurementId: "G-6FXEY67Y0B"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.email
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}

	async getAssessments(username) {
		try{
		const assessments = await this.db.collection('Assessments').orderBy("id", "asc").get()
		const result = assessments.docs.map(doc=>doc.data());
		const status = await Promise.all(result.map(async (item )=>{
			const res = await this.db.collection('AssessmentResults')
					.where('username','==',username)
					.where('assessmentID','==',item.id)
					.get();
			return res.docs.map(doc =>doc.data())[0];
			}))
			.then(data=> data)
			.catch( (err) => {
				console.log(err); 
				return null
			});
		for ( var i = 0 ; i < result.length ; i ++ ){
			result[i].status = status[i]? status[i].status : null;
		}
		return result;
		}
		catch{
			return null;
		}
	}

	async getSectionByID(id) {
		try{
			const sections = await this.db.collection('Sections').where('id','==',id).get();
			const section = sections.docs.map(doc=>doc.data())[0];
			const questionIDs = section.questions;
			return Promise.all(questionIDs.map( async (id) => {
				const res = await this.db.collection('Questions').where('id','==', id.questionID).get();
				return res.docs.map(doc =>doc.data())[0];
			}))
			.then(data=> {
				return data;
			})
			.catch(error =>
				{
					console.log(error);
					return null;
				});
		}
		catch{
			return null;
		}
	}

	addAssessment(assessment) {
		this.db.collection("Assessments").add(assessment)
		.then(function() {
			console.log("Document successfully written!");
		})
		.catch(function(error) {
			console.error("Error writing document: ", error);
		});
	}

	async getAssessmentStatus(username, id) {
		const status = await this.db.collection("AssessmentResults")
									.where('username','==',username)
									.where('assessmentID','==',id)
									.get();
		console.log(status.docs.map(item=>item.data()));
	}
}

export default new Firebase()
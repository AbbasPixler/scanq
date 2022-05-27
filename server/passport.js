const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const GOOGLE_CLIENT_ID = "129289860315-1l7pfe7vo6u8k2kkklsj13m3geh104bi.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const FACEBOOK_CLIENT_ID = "301804745494462"
const FACEBOOK_CLIENT_SECRET = "28d7db472f3fb55a4f857567c3acb055";

const SocialBaseUrl = "https://api.eatout.solutions/";


// ===========================GOOGLE STRATEGY===========================
// ===========================GOOGLE STRATEGY===========================
// ===========================GOOGLE STRATEGY===========================

passport.use(new GoogleStrategy({
  clientID:     GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL:  SocialBaseUrl+"auth/google/callback",
  passReqToCallback   : true
},
function(request, accessToken, refreshToken, profile, done){
// console.log(profile.emails[0].value);

  return done(null, profile)
}
));

// ===========================FACEBOOK STRATEGY===========================
// ===========================FACEBOOK STRATEGY===========================
// ===========================FACEBOOK STRATEGY===========================

passport.use(new FacebookStrategy({
  clientID:    FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: SocialBaseUrl+"auth/facebook/callback",
  passReqToCallback   : true,
  // profileFields: ['id', 'emails', 'name']
},
function(request, accessToken, refreshToken, profile, done){
// console.log(profile)
  return done(null, profile)
}
));


passport.serializeUser((user, done)=>{
  done(null, user)
})

passport.deserializeUser((user, done)=>{
  done(null, user)
})
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,42724,e=>{"use strict";var t=e.i(43476),r=e.i(22016),a=e.i(36699);let i=[{href:"#work",label:"Work"},{href:"#path",label:"Path"},{href:"#skills",label:"Skills"},{href:"#contact",label:"Contact"}];e.s(["default",0,function(){return(0,t.jsxs)("nav",{"aria-label":"Primary",className:"glass-nav",style:{position:"fixed",top:18,left:18,right:18,zIndex:60,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 30px",borderRadius:999,maxWidth:1160,margin:"0 auto"},children:[(0,t.jsxs)("a",{href:"#main",style:{fontFamily:"var(--font-heading)",fontWeight:600,letterSpacing:"0.02em",textDecoration:"none",color:"var(--copper)",fontSize:18},children:["JG",(0,t.jsx)("span",{style:{color:"var(--signal)"},children:"_"})]}),(0,t.jsxs)("div",{style:{display:"flex",gap:26,alignItems:"center"},children:[i.map(e=>(0,t.jsx)("a",{href:e.href,className:"nav-link",style:{fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--muted)",textDecoration:"none"},children:e.label},e.href)),(0,t.jsx)(r.default,{href:"/quick",style:{fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--bg)",background:"var(--copper)",padding:"8px 14px",borderRadius:2,textDecoration:"none",fontWeight:500},children:"Quick view"}),(0,t.jsx)("a",{href:a.identity.resumeFile,download:!0,style:{fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--signal)",textDecoration:"none"},children:"Résumé ↓"})]})]})}])},92349,e=>{"use strict";var t=e.i(43476),r=e.i(70703),a=e.i(22016),i=e.i(71645),o=e.i(46932),n=e.i(72328),s=e.i(36699);let l=(0,r.default)(()=>e.A(80401),{loadableGenerated:{modules:[72462]},ssr:!1}),d={hidden:{opacity:0,y:22},show:e=>({opacity:1,y:0,transition:{delay:.12*e,duration:.7,ease:[.22,1,.36,1]}})};e.s(["default",0,function(){let e=function(){let[e,t]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{try{let e=document.createElement("canvas"),r=e.getContext("webgl2")||e.getContext("webgl");t(!!r&&window.innerWidth>=760)}catch{t(!1)}},[]),e}(),r=(0,n.useReducedMotion)();return(0,t.jsxs)("header",{style:{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden"},children:[e?(0,t.jsx)(l,{animate:!r}):(0,t.jsx)("div",{"aria-hidden":!0,className:"atmosphere",style:{position:"absolute"}}),(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",inset:0,background:"linear-gradient(180deg, rgba(10,12,16,0.25) 0%, rgba(10,12,16,0.55) 60%, var(--bg) 100%)",pointerEvents:"none"}}),(0,t.jsxs)("div",{style:{position:"relative",maxWidth:1160,margin:"0 auto",padding:"140px 44px 100px",width:"100%"},children:[(0,t.jsx)(o.motion.p,{className:"mono-label",variants:d,initial:"hidden",animate:"show",custom:0,children:"Sunnyvale, CA — CS Student · USMC · Developer"}),(0,t.jsxs)(o.motion.h1,{variants:d,initial:"hidden",animate:"show",custom:1,style:{fontFamily:"var(--font-heading)",fontSize:"clamp(44px, 7.5vw, 92px)",fontWeight:600,lineHeight:1.02,letterSpacing:"-0.03em",margin:"26px 0 0",maxWidth:820},children:["Trained to find why systems fail.",(0,t.jsx)("br",{}),(0,t.jsx)("span",{style:{color:"var(--copper)"},children:"Now building systems that don’t."})]}),(0,t.jsxs)(o.motion.p,{variants:d,initial:"hidden",animate:"show",custom:2,style:{color:"var(--muted)",maxWidth:560,marginTop:28,fontSize:17},children:["I’m ",s.identity.name," — ",s.identity.summary.replace("Computer Science student and U.S. Marine Corps","a Computer Science student and U.S. Marine Corps").split(". ").slice(0,2).join(". "),"."]}),(0,t.jsxs)(o.motion.div,{variants:d,initial:"hidden",animate:"show",custom:3,style:{display:"flex",gap:14,marginTop:40,flexWrap:"wrap"},children:[(0,t.jsx)("a",{href:"#work",className:"btn btn-primary",children:"Explore the board"}),(0,t.jsx)(a.default,{href:"/quick",className:"btn btn-outline",children:"Quick view for recruiters"}),(0,t.jsx)("a",{href:s.identity.resumeFile,className:"btn btn-outline",download:!0,children:"Résumé (PDF)"})]}),(0,t.jsxs)(o.motion.div,{variants:d,initial:"hidden",animate:"show",custom:4,style:{marginTop:60,display:"inline-flex",alignItems:"center",gap:10,fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"var(--green)"},children:[(0,t.jsx)("span",{"aria-hidden":!0,style:{width:8,height:8,borderRadius:"50%",background:"var(--green)",boxShadow:"0 0 8px var(--green)"}}),s.identity.status]})]})]})}])},44413,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(88653),i=e.i(46932),o=e.i(72328),n=e.i(36699),s=e.i(59095);let l="https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",d=null;function c(){var e;return d||(d=(e=`${l}pyodide.js`,new Promise((t,r)=>{if(document.querySelector(`script[src="${e}"]`))return void t();let a=document.createElement("script");a.src=e,a.onload=()=>t(),a.onerror=()=>r(Error(`Failed to load ${e}`)),document.head.appendChild(a)})).then(()=>{if(!window.loadPyodide)throw Error("Pyodide failed to attach to window");return window.loadPyodide({indexURL:l})})),d}let p=null,u=`[CRITICAL] Hardcoded secret assigned to 'db_password'
test-fixtures/rules/hardcoded-secret/vulnerable.lua:2
This hardcodes a database password directly in source code, which gets exposed in version control, backups, and anyone with repository access can steal your database credentials. Move the password to a .env file or server config file outside the repository, then load it with os.getenv() or your framework's config system (QBCore/ESX typically use shared.lua or environment variables).

[CRITICAL] Hardcoded secret assigned to 'apiKey'
test-fixtures/rules/hardcoded-secret/vulnerable.lua:3
Hardcoding API keys directly in source code means anyone with access to the script files (including players who can inspect server resources or GitHub repos) can steal the key and abuse your services or drain your account. Move the key to your server.cfg file and access it via GetConvar("your_key_name") so secrets stay out of version control and player-accessible scripts.

[CRITICAL] Unvalidated parameter from server event 'esx_society:setJob' used in a state-changing call
test-fixtures/rules/missing-ace-check/vulnerable.lua:4
This code directly sets a player's job server-side without validating that the request came from an authorized admin, allowing any client to promote themselves to police. The fix is to add a server-side permission check using QBCore.Functions.HasPermission(source, 'admin') or xPlayer.getGroup() before executing the setJob call, and only allow job changes through a vetted admin command or callback.

[CRITICAL] Sensitive action reachable from a client trigger without an IsPlayerAceAllowed check
test-fixtures/rules/missing-ace-check/vulnerable.lua:4
This code allows any player to set any job without verifying they have permission (ACE), enabling privilege escalation where regular players can give themselves admin jobs like police. The fix is to add an ACE check before the setJob call: if not IsPlayerAceAllowed(source, "command.setjob") then return end (or equivalent server-side permission validation for your framework).

[CRITICAL] SQL query built with string concatenation in MySQL.query
test-fixtures/rules/sql-string-concat/vulnerable.lua:2
This code is vulnerable to SQL injection because the label variable is directly concatenated into the query string without escaping, allowing an attacker to break out of the string and execute arbitrary SQL commands. The fix is to use parameterized queries with placeholders: MySQL.query('UPDATE accounts SET money = money - ? WHERE label = ?', {amount, label}) which safely separates SQL logic from user data.

[CRITICAL] Export 'setSocietyMoney' changes money/job/permissions with no GetInvokingResource() check
test-fixtures/rules/unsafe-export/vulnerable.lua:1
This export allows any client-side script to directly modify society money without server-side validation, enabling trivial exploitation where players can give themselves unlimited funds. Move this function to the server-side and create a server export that validates the player's permissions and logs the transaction before processing any money changes.

[CRITICAL] Sensitive action reachable from a client trigger without an IsPlayerAceAllowed check
test-fixtures/rules/unvalidated-server-event/clean.lua:5
This code sets a player's job without checking if the executing player has ACE (Access Control Entry) permission to perform admin actions, allowing any player to execute this command and promote themselves or others to police. The fix is to add an ACE permission check before the setJob call, typically using IsPlayerAceAllowed(source, "command.setjob") or your framework's built-in permission system like QBCore.Functions.HasPermission(source, 'admin') to verify the caller is authorized.

[CRITICAL] Unvalidated parameter from server event 'esx_society:setJob' used in a state-changing call
test-fixtures/rules/unvalidated-server-event/vulnerable.lua:4
This code directly sets a player's job without validating the request came from an authorized admin, allowing any client to call this server event and promote themselves to police. The fix is to add permission checks before executing the job change: verify the caller has admin privileges using framework functions like QBCore.Functions.HasPermission(source, 'admin') or ESX's permission system before allowing the setJob call.

[CRITICAL] Sensitive action reachable from a client trigger without an IsPlayerAceAllowed check
test-fixtures/rules/unvalidated-server-event/vulnerable.lua:4
This code sets a player's job without checking if the executing player has ACE (Access Control Entry) permission to perform admin actions, allowing any player to execute this command and promote themselves or others to police. The fix is to add an ACE permission check before the setJob call, typically using IsPlayerAceAllowed(source, "command.setjob") or your framework's built-in permission system like QBCore.Functions.HasPermission(source, 'admin') to verify the caller is authorized.

9 critical, 0 warnings, 0 clean`,m={initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-6},transition:{duration:.3,ease:[.22,1,.36,1]}},h={display:"inline-flex",alignItems:"center",gap:6,fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--copper)"};function f({repo:e}){return(0,t.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{...h,marginTop:16},children:"View full source on GitHub →"})}function g({label:e,children:r,repo:a,disclaimer:i}){return(0,t.jsxs)("div",{style:{gridColumn:"1 / -1",borderTop:"1px solid var(--border)",paddingTop:22,marginTop:4},children:[(0,t.jsx)("p",{className:"mono-label",style:{marginBottom:12,color:"var(--signal)"},children:e}),i&&(0,t.jsxs)("p",{style:{fontSize:12,color:"var(--copper)",background:"rgba(255,176,32,0.08)",border:"1px solid var(--copper-dim)",padding:"8px 12px",marginBottom:14,maxWidth:560},children:["⚠ ",i]}),r,(0,t.jsx)(f,{repo:a})]})}function y({repo:e,demoPath:r,height:a=480,disclaimer:i}){return(0,t.jsx)(g,{label:"Try it — the real app, running live",repo:e,disclaimer:i,children:(0,t.jsx)("iframe",{title:`${r} demo`,src:`/demos/${r}/index.html`,style:{width:"100%",maxWidth:640,height:a,border:"1px solid var(--border)"}})})}function x({repo:e,source:n,packages:s=[],files:l={},imageOutput:d,run:p,disclaimer:u,bootNote:h,autoRun:f=!1,editableFile:y}){let b=(0,o.useReducedMotion)(),[v,j]=(0,r.useState)("idle"),[w,S]=(0,r.useState)(null),[T,k]=(0,r.useState)(null),[E,_]=(0,r.useState)(null),[C,A]=(0,r.useState)(y?l[y.name]??"":""),R=(0,r.useRef)(null),I=async()=>{j("booting");try{let e=await c();return s.length&&await e.loadPackage(s),R.current=e,j("ready"),e}catch(e){return _(e instanceof Error?e.message:String(e)),j("error"),null}},N=async()=>{let e=R.current;if(e||(e=await I())){j("running");try{Object.entries(l).forEach(([t,r])=>{let a=y&&t===y.name?C:r;e.FS.writeFile(t,a)}),e.runPython(n);let t=p(e);if(S(t.trim()),d)try{let t=e.FS.readFile(d),r=new Blob([t],{type:"image/png"});k(URL.createObjectURL(r))}catch{}j("ready")}catch(e){_(e instanceof Error?e.message:String(e)),j("error")}}};return(0,r.useEffect)(()=>{f&&N()},[]),(0,t.jsxs)(g,{label:"Try it — the real script, running live via Pyodide",repo:e,disclaimer:u,children:["idle"===v&&!f&&(0,t.jsx)("button",{onClick:N,className:"btn btn-primary",children:"Run script"}),(0,t.jsx)(a.AnimatePresence,{mode:"wait",children:"booting"===v&&(0,t.jsx)(i.motion.p,{...b?{}:m,style:{fontSize:13,color:"var(--muted)",fontFamily:"var(--font-mono)"},children:h??"Booting a Python runtime in your browser (first run only)…"},"booting")}),y&&("ready"===v||"running"===v)&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("textarea",{value:C,onChange:e=>A(e.target.value),rows:y.rows??6,spellCheck:!1,style:{width:"100%",maxWidth:480,padding:"12px 14px",background:"var(--bg-raised)",border:"1px solid var(--border)",color:"var(--ink)",fontFamily:"var(--font-mono)",fontSize:12.5,resize:"vertical"}}),(0,t.jsx)("div",{children:(0,t.jsx)("button",{onClick:N,disabled:"running"===v,className:"btn btn-primary",style:{marginTop:12},children:"running"===v?"Running…":"Run script"})})]}),(0,t.jsx)(a.AnimatePresence,{children:"error"===v&&(0,t.jsxs)(i.motion.p,{...b?{}:m,style:{fontSize:13,color:"#ff5c5c"},children:["Couldn’t run this here.",E&&(0,t.jsx)("span",{style:{display:"block",fontFamily:"var(--font-mono)",fontSize:11,color:"var(--muted)",marginTop:4},children:E})]},"error")}),(0,t.jsx)(a.AnimatePresence,{children:w&&(0,t.jsx)(i.motion.pre,{initial:!b&&{opacity:0,y:8},animate:{opacity:1,y:0},exit:b?void 0:{opacity:0,y:-8},transition:{duration:.32,ease:[.22,1,.36,1]},style:{marginTop:14,padding:"14px 16px",background:"var(--bg-raised)",border:"1px solid var(--signal-dim)",color:"var(--signal)",fontFamily:"var(--font-mono)",fontSize:12.5,whiteSpace:"pre-wrap",maxWidth:480,overflowX:"auto"},children:w},"output")}),(0,t.jsx)(a.AnimatePresence,{children:T&&(0,t.jsx)(i.motion.img,{src:T,alt:"Script output chart",initial:!b&&{opacity:0,y:8},animate:{opacity:1,y:0},exit:b?void 0:{opacity:0},transition:{duration:.35,ease:[.22,1,.36,1]},style:{marginTop:14,maxWidth:480,width:"100%",border:"1px solid var(--border)"}},"chart")})]})}let b=`COURSES = [
    {"code": "CIS 22A", "name": "Beginning Programming Methodologies in C++", "professor": "TBD"},
    {"code": "CIS 22B", "name": "Intermediate Programming Methodologies in C++", "professor": "TBD"},
    {"code": "CIS 22C", "name": "Data Abstraction and Structures", "professor": "TBD"},
    {"code": "MATH 1A", "name": "Calculus I", "professor": "TBD"},
    {"code": "MATH 22", "name": "Discrete Mathematics", "professor": "TBD"},
]


def search(query):
    query = query.lower()
    return [
        c for c in COURSES
        if query in c["code"].lower()
        or query in c["name"].lower()
        or query in c["professor"].lower()
    ]
`;function v({repo:e}){let[a,o]=(0,r.useState)("CIS"),[n,s]=(0,r.useState)("idle"),[l,d]=(0,r.useState)([]),p=(0,r.useRef)(null);(0,r.useEffect)(()=>{let e=!1;return s("booting"),c().then(t=>{e||(t.runPython(b),p.current=t,s("ready"),u("CIS",t))}).catch(()=>!e&&s("error")),()=>{e=!0}},[]);let u=(e,t)=>{let r=t??p.current;r&&d(r.globals.get("search")(e).toJs().map(e=>`${String(e.get("code")).padEnd(10)} ${e.get("name")}`))};return(0,t.jsxs)(g,{label:"Try it — the real course_lookup.py, running live via Pyodide",repo:e,disclaimer:"Placeholder course data — the README flags this as sample data to replace with a real catalog export before relying on it.",children:["booting"===n&&(0,t.jsx)("p",{style:{fontSize:13,color:"var(--muted)",fontFamily:"var(--font-mono)"},children:"Booting a Python runtime…"}),"error"===n&&(0,t.jsx)("p",{style:{fontSize:13,color:"#ff5c5c"},children:"Couldn’t boot the Python runtime here."}),(0,t.jsx)("input",{type:"text",value:a,onChange:e=>{o(e.target.value),u(e.target.value)},placeholder:"Search by code, name, or professor…",disabled:"ready"!==n,style:{width:"100%",maxWidth:420,padding:"12px 14px",background:"var(--bg-raised)",border:"1px solid var(--border)",color:"var(--ink)",fontFamily:"var(--font-mono)",fontSize:14}}),(0,t.jsx)(i.motion.pre,{initial:{opacity:.4},animate:{opacity:1},transition:{duration:.2,ease:[.22,1,.36,1]},style:{marginTop:12,padding:"12px 14px",background:"var(--bg-raised)",border:"1px solid var(--border)",color:"var(--signal)",fontFamily:"var(--font-mono)",fontSize:12.5,maxWidth:480,minHeight:60},children:l.length?l.join("\n"):"No matches."},l.join("|"))]})}function j({repo:e}){return(0,t.jsxs)(g,{label:"Real captured output — scanning the tool's own vulnerable test fixtures",repo:e,children:[(0,t.jsx)("pre",{style:{padding:"14px 16px",background:"#0a0a0a",border:"1px solid var(--border)",color:"#ff6b6b",fontFamily:"var(--font-mono)",fontSize:11.5,lineHeight:1.6,maxWidth:640,maxHeight:360,overflow:"auto",whiteSpace:"pre-wrap"},children:u}),(0,t.jsx)("p",{style:{fontSize:12,color:"var(--muted)",marginTop:10},children:"A Node CLI that reads real files from disk can’t run meaningfully inside a browser sandbox — this is genuine output from running it locally, not simulated."})]})}function w({repo:e}){return(0,t.jsx)(g,{label:"Real output from this exact script",repo:e,disclaimer:"Fabricated sample posts — the README flags this data as placeholder, to replace with real Reddit API data before drawing any conclusions.",children:(0,t.jsx)("img",{src:"/demos/reddit-sentiment/sentiment_over_time.png",alt:"Sentiment over time chart (sample data)",style:{maxWidth:480,width:"100%",border:"1px solid var(--border)"}})})}let S={initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-6},transition:{duration:.3,ease:[.22,1,.36,1]}},T={display:"inline-flex",alignItems:"center",gap:6,fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--copper)"};function k({repo:e}){return(0,t.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{...T,marginTop:16},children:"View full source on GitHub →"})}function E({label:e,children:r,repo:a}){return(0,t.jsxs)("div",{style:{gridColumn:"1 / -1",borderTop:"1px solid var(--border)",paddingTop:22,marginTop:4},children:[(0,t.jsx)("p",{className:"mono-label",style:{marginBottom:12,color:"var(--signal)"},children:e}),r,(0,t.jsx)(k,{repo:a})]})}let _=`import re

COMMON_PASSWORDS = {
    "password",
    "123456",
    "123456789",
    "qwerty",
    "abc123",
    "password123",
    "admin",
    "welcome"
}

def check_password_strength(password):
    score = 0
    feedback = []

    if password.lower() in COMMON_PASSWORDS:
        return "Very Weak", ["This password is too common. Choose a more unique password."]

    if len(password) >= 8:
        score += 1
    else:
        feedback.append("Use at least 8 characters.")

    if len(password) >= 12:
        score += 1

    if re.search(r"[A-Z]", password):
        score += 1
    else:
        feedback.append("Add at least one uppercase letter.")

    if re.search(r"[a-z]", password):
        score += 1
    else:
        feedback.append("Add at least one lowercase letter.")

    if re.search(r"\\d", password):
        score += 1
    else:
        feedback.append("Add at least one number.")

    if re.search(r"[!@#$%^&*(),.?\\":{}|<>_\\-+=/]", password):
        score += 1
    else:
        feedback.append("Add at least one special character.")

    if re.search(r"(.)\\1\\1", password):
        feedback.append("Avoid repeating the same character multiple times.")
    else:
        score += 1

    if score <= 2:
        strength = "Weak"
    elif score <= 4:
        strength = "Medium"
    elif score <= 6:
        strength = "Strong"
    else:
        strength = "Very Strong"

    return strength, feedback
`,C={"—":"var(--muted)","Very Weak":"#ff5c5c",Weak:"#ff5c5c",Medium:"var(--copper)",Strong:"var(--signal)","Very Strong":"var(--signal)"};function A({repo:e}){let n=(0,o.useReducedMotion)(),[s,l]=(0,r.useState)(""),[d,p]=(0,r.useState)("—"),[u,m]=(0,r.useState)([]),[h,f]=(0,r.useState)("booting"),g=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=!1;return c().then(t=>{e||(t.runPython(_),g.current=t,f("ready"))}).catch(()=>!e&&f("error")),()=>{e=!0}},[]),(0,r.useEffect)(()=>{if("ready"!==h||!g.current)return;if(!s){p("—"),m([]);return}let e=g.current.globals.get("check_password_strength")(s),[t,r]=e.toJs();e.destroy(),p(t),m(r)},[s,h]),(0,t.jsxs)(E,{label:"Try it — the real password_checker.py, running live via Pyodide",repo:e,children:[(0,t.jsxs)(a.AnimatePresence,{mode:"wait",children:["booting"===h&&(0,t.jsx)(i.motion.p,{...n?{}:S,style:{fontSize:13,color:"var(--muted)",fontFamily:"var(--font-mono)"},children:"Booting a Python runtime in your browser (first run only, ~2-3s)…"},"booting"),"error"===h&&(0,t.jsxs)(i.motion.p,{...n?{}:S,style:{fontSize:13,color:"#ff5c5c"},children:["Couldn’t load the Python runtime. ",(0,t.jsx)("a",{href:e,style:{color:"var(--copper)"},children:"View the source directly"})," instead."]},"error")]}),(0,t.jsx)("input",{type:"text",value:s,onChange:e=>l(e.target.value),placeholder:"Type a password to test…",spellCheck:!1,autoComplete:"off",disabled:"ready"!==h,style:{width:"100%",maxWidth:420,padding:"12px 14px",background:"var(--bg-raised)",border:"1px solid var(--border)",color:"var(--ink)",fontFamily:"var(--font-mono)",fontSize:14,opacity:"ready"===h?1:.5,transition:"opacity 0.3s ease, border-color 0.25s ease"}}),(0,t.jsxs)("div",{style:{marginTop:14,display:"flex",alignItems:"center",gap:10},children:[(0,t.jsx)("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--muted)",textTransform:"uppercase"},children:"Strength:"}),(0,t.jsx)(a.AnimatePresence,{mode:"wait",children:(0,t.jsx)(i.motion.span,{initial:!n&&{opacity:0,y:4},animate:{opacity:1,y:0},exit:n?void 0:{opacity:0,y:-4},transition:{duration:.22,ease:[.22,1,.36,1]},style:{fontFamily:"var(--font-mono)",fontSize:13,fontWeight:600,color:C[d]},children:d},d)})]}),(0,t.jsx)(a.AnimatePresence,{children:u.length>0&&(0,t.jsx)(i.motion.ul,{initial:!n&&{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:n?void 0:{opacity:0,height:0},transition:{duration:.28,ease:[.22,1,.36,1]},style:{marginTop:10,paddingLeft:18,color:"var(--muted)",fontSize:13,overflow:"hidden"},children:u.map((e,r)=>(0,t.jsx)("li",{children:e},r))},"feedback")})]})}let R=`import csv

def read_orders(filename):
    orders = {}

    try:
        with open(filename, mode="r", newline="") as file:
            reader = csv.DictReader(file)

            for row in reader:
                burger_id = row["Burger"]
                quantities = []

                for day, value in row.items():
                    if day != "Burger":
                        try:
                            quantities.append(int(value))
                        except ValueError:
                            print(f"Invalid number found for Burger {burger_id}. Using 0 instead.")
                            quantities.append(0)

                orders[burger_id] = quantities

    except FileNotFoundError:
        print("Error: File not found.")
        return {}

    return orders

def calculate_totals(orders):
    totals = {}
    for burger_id, quantities in orders.items():
        totals[burger_id] = sum(quantities)
    return totals

def get_total_orders_all_burgers(totals):
    return sum(totals.values())

def get_top_selling_burger(totals):
    if not totals:
        return None, 0
    top_burger = max(totals, key=totals.get)
    return top_burger, totals[top_burger]

def print_report(totals):
    print("\\n--- Burger Order Report ---")
    for burger_id, total in totals.items():
        print(f"Burger {burger_id}: {total} total orders")

    overall_total = get_total_orders_all_burgers(totals)
    top_burger, top_total = get_top_selling_burger(totals)

    print(f"\\nOverall total orders: {overall_total}")
    print(f"Top-selling burger: Burger {top_burger} with {top_total} orders")

def main():
    filename = "orders.csv"
    orders = read_orders(filename)

    if not orders:
        return

    totals = calculate_totals(orders)
    print_report(totals)
`,I=`Burger,Day1,Day2,Day3,Day4
1,10,12,14,9
2,8,7,15,10
3,5,6,4,8
4,9,11,10,7
5,3,5,6,4`;function N({repo:e}){let n=(0,o.useReducedMotion)(),[s,l]=(0,r.useState)(I),[d,p]=(0,r.useState)(null),[u,m]=(0,r.useState)("booting"),h=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=!1;return c().then(t=>{e||(t.runPython(R),h.current=t,m("ready"))}).catch(()=>!e&&m("error")),()=>{e=!0}},[]),(0,t.jsxs)(E,{label:"Try it — the real order_processor.py, running live via Pyodide",repo:e,children:[(0,t.jsxs)(a.AnimatePresence,{mode:"wait",children:["booting"===u&&(0,t.jsx)(i.motion.p,{...n?{}:S,style:{fontSize:13,color:"var(--muted)",fontFamily:"var(--font-mono)"},children:"Booting a Python runtime in your browser (first run only, ~2-3s)…"},"booting"),"error"===u&&(0,t.jsxs)(i.motion.p,{...n?{}:S,style:{fontSize:13,color:"#ff5c5c"},children:["Couldn’t load the Python runtime. ",(0,t.jsx)("a",{href:e,style:{color:"var(--copper)"},children:"View the source directly"})," instead."]},"error")]}),(0,t.jsx)("textarea",{value:s,onChange:e=>l(e.target.value),rows:6,spellCheck:!1,style:{width:"100%",maxWidth:480,padding:"12px 14px",background:"var(--bg-raised)",border:"1px solid var(--border)",color:"var(--ink)",fontFamily:"var(--font-mono)",fontSize:12.5,resize:"vertical"}}),(0,t.jsx)("div",{children:(0,t.jsx)("button",{onClick:()=>{let e=h.current;if(!e)return;m("running");let t="";e.setStdout({batched:e=>t+=e+"\n"}),e.FS.writeFile("orders.csv",s),e.runPython("main()"),e.setStdout({}),p(t.trim()),m("ready")},disabled:"booting"===u||"error"===u||"running"===u,className:"btn btn-primary",style:{marginTop:12,opacity:"ready"===u?1:.6},children:"running"===u?"Running…":"Run analysis"})}),(0,t.jsx)(a.AnimatePresence,{children:d&&(0,t.jsx)(i.motion.pre,{initial:!n&&{opacity:0,y:8},animate:{opacity:1,y:0},exit:n?void 0:{opacity:0,y:-8},transition:{duration:.32,ease:[.22,1,.36,1]},style:{marginTop:14,padding:"14px 16px",background:"var(--bg-raised)",border:"1px solid var(--signal-dim)",color:"var(--signal)",fontFamily:"var(--font-mono)",fontSize:12.5,whiteSpace:"pre-wrap",maxWidth:480},children:d},"output")})]})}let F=`<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>
* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; background: linear-gradient(to bottom right, #f5f7f3, #e9efe8); color: #222; }
.page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.card { width: 100%; max-width: 700px; background: #fff; border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
h1 { margin-top: 0; text-align: center; }
.subtitle { text-align: center; color: #555; margin-bottom: 24px; }
.search-box { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
input { flex: 1; min-width: 240px; padding: 14px; border: 1px solid #cfd8cc; border-radius: 10px; font-size: 16px; }
button { padding: 14px 22px; border: none; border-radius: 10px; font-size: 16px; cursor: pointer; background: #6e8b6b; color: #fff; }
button:hover { background: #5c7859; }
.result { margin-top: 24px; padding: 18px; border-radius: 12px; font-size: 18px; text-align: center; }
.result.success { background: #eef7ee; color: #245224; border: 1px solid #bfd8bf; }
.result.error { background: #fff1f1; color: #8a2d2d; border: 1px solid #e5bcbc; }
.hidden { display: none; }
.admin-toggle { margin-top: 24px; text-align: center; }
.admin-toggle button { background: transparent; color: #6e8b6b; border: 1px solid #cfd8cc; font-size: 14px; padding: 10px 16px; }
.admin-toggle button:hover { background: #f2f6f1; }
.admin-section { margin-top: 24px; padding-top: 24px; border-top: 1px solid #e2e8e0; }
.admin-section h2 { font-size: 20px; margin-bottom: 4px; }
.admin-note { color: #666; font-size: 14px; margin-top: 0; margin-bottom: 16px; }
.add-guest-form { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.add-guest-form input { flex: 1; min-width: 140px; }
.add-guest-form button { flex: 0 0 auto; }
#guestList { list-style: none; padding-left: 0; color: #444; }
#guestList li { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 12px; margin-bottom: 6px; background: #f7f9f6; border-radius: 8px; }
.remove-guest-button { background: #c96b6b; padding: 6px 12px; font-size: 13px; }
.remove-guest-button:hover { background: #b25454; }
.clear-button { background: transparent; color: #8a2d2d; border: 1px solid #e5bcbc; margin-top: 4px; }
.clear-button:hover { background: #fff1f1; }
</style></head><body>
<div class="page"><div class="card">
<h1>Wedding Seating Chart</h1>
<p class="subtitle">Search for your name to find your table.</p>
<div class="search-box">
<input type="text" id="searchInput" placeholder="Enter first name, last name, or full name"/>
<button id="searchButton">Search</button>
</div>
<div id="result" class="result hidden"></div>
<div class="admin-toggle"><button id="adminToggleButton" type="button">Manage guest list</button></div>
<div id="adminSection" class="admin-section hidden">
<h2>Add / Manage Guests</h2>
<p class="admin-note">Names entered here are saved only in this browser. Add every guest below.</p>
<form id="addGuestForm" class="add-guest-form">
<input type="text" id="firstNameInput" placeholder="First name" required/>
<input type="text" id="lastNameInput" placeholder="Last name" required/>
<input type="text" id="tableInput" placeholder="Table (e.g. Table 3)" required/>
<button type="submit">Add Guest</button>
</form>
<ul id="guestList"></ul>
<button id="clearAllButton" type="button" class="clear-button">Clear all guests</button>
</div>
</div></div>
<script>
const STORAGE_KEY = "weddingSeatingGuests";
let guests = loadGuests();
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultDiv = document.getElementById("result");
const adminToggleButton = document.getElementById("adminToggleButton");
const adminSection = document.getElementById("adminSection");
const addGuestForm = document.getElementById("addGuestForm");
const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const tableInput = document.getElementById("tableInput");
const guestList = document.getElementById("guestList");
const clearAllButton = document.getElementById("clearAllButton");
function loadGuests() {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; }
  catch (err) { return []; }
}
function saveGuests() { localStorage.setItem(STORAGE_KEY, JSON.stringify(guests)); }
function renderGuestList() {
  guestList.innerHTML = "";
  guests.forEach((guest, index) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = guest.firstName + " " + guest.lastName + " — " + guest.table;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove"; removeBtn.type = "button"; removeBtn.className = "remove-guest-button";
    removeBtn.addEventListener("click", () => { guests.splice(index, 1); saveGuests(); renderGuestList(); });
    li.appendChild(label); li.appendChild(removeBtn); guestList.appendChild(li);
  });
}
function showResult(message, type) {
  resultDiv.textContent = message; resultDiv.classList.remove("hidden","success","error"); resultDiv.classList.add(type);
}
function findGuest() {
  const input = searchInput.value.trim().toLowerCase();
  if (!input) { showResult("Please enter a guest name.", "error"); return; }
  if (guests.length === 0) { showResult("No guests have been added yet.", "error"); return; }
  const matches = guests.filter((g) => {
    const first = g.firstName.toLowerCase(), last = g.lastName.toLowerCase(), full = first + " " + last;
    return first.includes(input) || last.includes(input) || full.includes(input);
  });
  if (matches.length === 1) { const g = matches[0]; showResult(g.firstName + " " + g.lastName + ", your table is " + g.table + ".", "success"); }
  else if (matches.length > 1) { showResult("Multiple matches found: " + matches.map((g) => g.firstName + " " + g.lastName + " (" + g.table + ")").join(", "), "success"); }
  else { showResult("Guest not found. Please try another name.", "error"); }
}
function addGuest(event) {
  event.preventDefault();
  const firstName = firstNameInput.value.trim(), lastName = lastNameInput.value.trim(), table = tableInput.value.trim();
  if (!firstName || !lastName || !table) return;
  guests.push({ firstName, lastName, table }); saveGuests(); renderGuestList();
  addGuestForm.reset(); firstNameInput.focus();
}
function clearAllGuests() {
  const confirmed = confirm("Remove all guests from the list? This cannot be undone.");
  if (!confirmed) return;
  guests = []; saveGuests(); renderGuestList();
}
searchButton.addEventListener("click", findGuest);
searchInput.addEventListener("keypress", function (event) { if (event.key === "Enter") findGuest(); });
adminToggleButton.addEventListener("click", () => { adminSection.classList.toggle("hidden"); });
addGuestForm.addEventListener("submit", addGuest);
clearAllButton.addEventListener("click", clearAllGuests);
renderGuestList();
</script></body></html>`;function P({repo:e}){return(0,t.jsx)(E,{label:"Try it — the real app (with the new admin panel), running live",repo:e,children:(0,t.jsx)("iframe",{title:"Wedding Seating Chart demo",srcDoc:F,style:{width:"100%",maxWidth:560,height:480,border:"1px solid var(--border)"}})})}function z({repo:e}){let n=(0,o.useReducedMotion)(),s=(0,r.useRef)(null),[l,d]=(0,r.useState)("idle"),[c,u]=(0,r.useState)(null);return(0,t.jsxs)(E,{label:"Try it — the real compiled game.jar, running in a browser-side JVM (CheerpJ)",repo:e,children:[(0,t.jsxs)(i.motion.div,{animate:{height:"idle"===l?120:480},transition:n?{duration:0}:{duration:.4,ease:[.22,1,.36,1]},style:{position:"relative",width:"100%",maxWidth:650,background:"#000",border:"1px solid var(--border)",overflow:"hidden"},children:[(0,t.jsx)("div",{ref:s,style:{width:650,height:480,maxWidth:"100%"}}),(0,t.jsx)(a.AnimatePresence,{children:"running"!==l&&(0,t.jsxs)(i.motion.div,{initial:!n&&{opacity:0},animate:{opacity:1},exit:n?void 0:{opacity:0},transition:{duration:.25,ease:[.22,1,.36,1]},style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",padding:20,textAlign:"center"},children:["idle"===l&&(0,t.jsx)("button",{onClick:()=>{var e;d("booting"),u(null),(!p&&(p=(e="https://cjrtnc.leaningtech.com/3.0/cj3loader.js",new Promise((t,r)=>{if(document.querySelector(`script[src="${e}"]`))return void t();let a=document.createElement("script");a.src=e,a.onload=()=>t(),a.onerror=()=>r(Error(`Failed to load ${e}`)),document.head.appendChild(a)})).then(async()=>{if(!window.cheerpjInit)throw Error("CheerpJ failed to attach to window");await window.cheerpjInit({status:"none"})})),p).then(()=>{if(!s.current||!window.cheerpjCreateDisplay||!window.cheerpjRunJar)throw Error("CheerpJ did not attach to window correctly.");return window.cheerpjCreateDisplay(650,480,s.current),d("running"),window.cheerpjRunJar("/app/game.jar")}).catch(e=>{u(e instanceof Error?e.message:String(e)),d("error")})},className:"btn btn-primary",children:"Launch game (loads a JVM in-browser, ~15MB)"}),"booting"===l&&(0,t.jsx)("p",{style:{fontSize:13,color:"var(--muted)",fontFamily:"var(--font-mono)"},children:"Booting a JVM in your browser… this can take 5-10 seconds the first time."}),"error"===l&&(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{style:{fontSize:13,color:"#ff5c5c",marginBottom:8},children:"Couldn’t boot the in-browser JVM here."}),c&&(0,t.jsx)("p",{style:{fontSize:11,color:"var(--muted)",fontFamily:"var(--font-mono)",marginBottom:8},children:c}),(0,t.jsx)("a",{href:e,style:{color:"var(--copper)"},children:"View the source"})," instead."]})]},l)})]}),(0,t.jsx)("p",{style:{fontSize:12,color:"var(--muted)",marginTop:10},children:"Compiled locally from the actual JavaFinal source with a real JDK — this is the same bytecode that runs on desktop, not a rewrite."})]})}let B=`import random

from scipy import stats

random.seed(42)


def simulate_group(n, true_conversion_rate):
    return [1 if random.random() < true_conversion_rate else 0 for _ in range(n)]


def run_ab_test(n_per_group=2000, control_rate=0.10, variant_rate=0.115):
    control = simulate_group(n_per_group, control_rate)
    variant = simulate_group(n_per_group, variant_rate)

    control_conversions = sum(control)
    variant_conversions = sum(variant)

    count = [control_conversions, variant_conversions]
    nobs = [len(control), len(variant)]

    p1 = count[0] / nobs[0]
    p2 = count[1] / nobs[1]
    p_pool = (count[0] + count[1]) / (nobs[0] + nobs[1])
    se = (p_pool * (1 - p_pool) * (1 / nobs[0] + 1 / nobs[1])) ** 0.5
    z = (p2 - p1) / se
    p_value = 2 * (1 - stats.norm.cdf(abs(z)))

    print(f"Control conversion rate: {p1:.4f} ({control_conversions}/{nobs[0]})")
    print(f"Variant conversion rate: {p2:.4f} ({variant_conversions}/{nobs[1]})")
    print(f"Z-score: {z:.3f}")
    print(f"P-value: {p_value:.4f}")

    alpha = 0.05
    if p_value < alpha:
        print(f"Result: statistically significant at alpha={alpha} — reject the null hypothesis.")
    else:
        print(f"Result: NOT statistically significant at alpha={alpha} — fail to reject the null hypothesis.")
`,L=`import csv
import matplotlib
matplotlib.use("AGG")
import matplotlib.pyplot as plt


def load_data(path="sample_stats.csv"):
    rows = []
    with open(path, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            row["points"] = float(row["points"])
            row["assists"] = float(row["assists"])
            rows.append(row)
    return rows


def plot_points_vs_assists(rows, out_path="points_vs_assists.png"):
    names = [r["player"] for r in rows]
    points = [r["points"] for r in rows]
    assists = [r["assists"] for r in rows]

    plt.figure(figsize=(7, 6))
    plt.scatter(assists, points, color="#4f7cff")
    for name, x, y in zip(names, assists, points):
        plt.annotate(name, (x, y), fontsize=8, xytext=(4, 4), textcoords="offset points")
    plt.xlabel("Assists per game")
    plt.ylabel("Points per game")
    plt.title("Points vs. Assists (sample data)")
    plt.tight_layout()
    plt.savefig(out_path)
    print(f"Saved chart to {out_path}")
`,O=`import csv
from collections import defaultdict

import matplotlib
matplotlib.use("AGG")
import matplotlib.pyplot as plt


def load_data(path="sample_data.csv"):
    rows = []
    with open(path, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            row["transfer_rate"] = float(row["transfer_rate"])
            rows.append(row)
    return rows


def summarize_by_major(rows):
    totals = defaultdict(list)
    for r in rows:
        totals[r["major"]].append(r["transfer_rate"])
    return {major: sum(rates) / len(rates) for major, rates in totals.items()}


def plot_summary(summary, out_path="transfer_rates_by_major.png"):
    majors = list(summary.keys())
    rates = list(summary.values())

    plt.figure(figsize=(8, 5))
    plt.barh(majors, rates, color="#4f7cff")
    plt.xlabel("Average Transfer Rate (%)")
    plt.title("Average Transfer Rate by Major (sample data)")
    plt.tight_layout()
    plt.savefig(out_path)
    print(f"Saved chart to {out_path}")
`,M=`import csv

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score


def load_data(path="sample_transactions.csv"):
    descriptions, amounts, categories = [], [], []
    with open(path, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            descriptions.append(row["description"])
            amounts.append(float(row["amount"]))
            categories.append(row["category"])
    return descriptions, amounts, categories


def train_and_report():
    descriptions, amounts, categories = load_data()

    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(descriptions)

    X_train, X_test, y_train, y_test = train_test_split(
        X, categories, test_size=0.3, random_state=42, stratify=categories
    )

    model = LogisticRegression(max_iter=1000)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    out = f"Accuracy: {accuracy_score(y_test, preds):.2%} ({len(y_test)} held-out transactions)\\n\\n"
    out += classification_report(y_test, preds, zero_division=0)
    return out
`,D=`player,points,assists
Player A,28.5,6.2
Player B,24.1,9.8
Player C,31.0,4.5
Player D,19.8,11.2
Player E,22.4,7.9`,G=`school,major,transfer_rate
De Anza College,Computer Science,42.0
De Anza College,Data Science,38.5
De Anza College,Business,45.2
Foothill College,Computer Science,40.1
Foothill College,Data Science,36.9`,W=`description,amount,category
STARBUCKS COFFEE,5.75,Food
CHEVRON GAS STATION,42.10,Transportation
NETFLIX SUBSCRIPTION,15.99,Entertainment
SAFEWAY GROCERY,63.22,Food
UBER TRIP,12.40,Transportation
SPOTIFY PREMIUM,10.99,Entertainment
CHIPOTLE MEXICAN GRILL,11.50,Food
SHELL GAS,38.75,Transportation
AMC THEATERS,18.00,Entertainment
TRADER JOES,47.30,Food
WHOLE FOODS MARKET,55.10,Food
LYFT RIDE,9.80,Transportation
HULU SUBSCRIPTION,7.99,Entertainment
76 GAS STATION,44.60,Transportation
PANERA BREAD,13.25,Food
DISNEY PLUS,9.99,Entertainment
COSTCO GAS,52.00,Transportation
IN N OUT BURGER,8.75,Food
STEAM GAMES PURCHASE,29.99,Entertainment
RALPHS GROCERY,71.40,Food
BART FARE,6.25,Transportation
MCDONALDS,7.10,Food
YOUTUBE PREMIUM,13.99,Entertainment
ARCO GAS STATION,36.90,Transportation
PEETS COFFEE,4.95,Food
AMAZON PRIME VIDEO,8.99,Entertainment
CALTRAIN TICKET,5.50,Transportation
JACK IN THE BOX,9.40,Food
REGAL CINEMAS,16.50,Entertainment
UNION 76 FUEL,41.20,Transportation
SPROUTS FARMERS MARKET,38.60,Food
LIME SCOOTER RENTAL,4.25,Transportation
XBOX GAME PASS,14.99,Entertainment
SUBWAY SANDWICH,10.10,Food
VALERO GAS,39.85,Transportation
PLAYSTATION STORE,19.99,Entertainment
KROGER GROCERY,66.75,Food
LYFT AIRPORT RIDE,34.50,Transportation
APPLE TV PLUS,6.99,Entertainment
TACO BELL,6.80,Food
SHELL FUEL STOP,43.15,Transportation
CINEMARK THEATERS,15.25,Entertainment
ALBERTSONS,58.90,Food
UBER EATS DELIVERY,22.40,Food
NINTENDO ESHOP,9.99,Entertainment
CHEVRON FUEL,40.50,Transportation
WENDYS,8.20,Food
PANDORA PREMIUM,4.99,Entertainment
AMTRAK TICKET,29.00,Transportation
FOOD LION GROCERY,49.30,Food`;function H({id:e,repo:r}){switch(e){case"password-checker":return(0,t.jsx)(A,{repo:r});case"csv-processor":return(0,t.jsx)(N,{repo:r});case"wedding-app":return(0,t.jsx)(P,{repo:r});case"java-game":return(0,t.jsx)(z,{repo:r});case"transfer-tracker":return(0,t.jsx)(y,{repo:r,demoPath:"transfer-tracker",height:520});case"transfer-dashboard-v2":return(0,t.jsx)(y,{repo:r,demoPath:"transfer-dashboard-v2",height:560});case"leetcode-tracker":return(0,t.jsx)(y,{repo:r,demoPath:"leetcode-tracker",height:520});case"resume-matcher":return(0,t.jsx)(y,{repo:r,demoPath:"resume-matcher",height:520});case"health-platformer":return(0,t.jsx)(y,{repo:r,demoPath:"health-platformer",height:520});case"club-event-finder":return(0,t.jsx)(y,{repo:r,demoPath:"club-event-finder",height:520,disclaimer:"Placeholder event data — the README flags this as sample data to replace with real, current De Anza club/event listings."});case"w0nd3r-guard":return(0,t.jsx)(j,{repo:r});case"cli-tool":return(0,t.jsx)(v,{repo:r});case"ab-test-simulation":return(0,t.jsx)(x,{repo:r,source:B,packages:["scipy"],run:e=>{let t="";return e.setStdout({batched:e=>t+=e+"\n"}),e.runPython("run_ab_test()"),e.setStdout({}),t},bootNote:"Booting Python + scipy in your browser (first run only, ~10-15s)…"});case"sports-stats-analysis":return(0,t.jsx)(x,{repo:r,source:L,packages:["matplotlib"],files:{"sample_stats.csv":D},imageOutput:"points_vs_assists.png",editableFile:{name:"sample_stats.csv",rows:6},disclaimer:"Fake sample data — the README flags this as placeholder, to swap for real stats from a sport/game you follow.",bootNote:"Booting Python + matplotlib in your browser (first run only, ~10-15s)…",run:e=>{let t="";return e.setStdout({batched:e=>t+=e+"\n"}),e.runPython("plot_points_vs_assists(load_data())"),e.setStdout({}),t}});case"transfer-outcomes-analysis":return(0,t.jsx)(x,{repo:r,source:O,packages:["matplotlib"],files:{"sample_data.csv":G},imageOutput:"transfer_rates_by_major.png",editableFile:{name:"sample_data.csv",rows:6},disclaimer:"Fabricated sample data — the README flags this as placeholder, to replace with a real CalPASS/CCC Chancellor's Office export before treating any numbers as real.",bootNote:"Booting Python + matplotlib in your browser (first run only, ~10-15s)…",run:e=>{let t="";return e.setStdout({batched:e=>t+=e+"\n"}),e.runPython("summary = summarize_by_major(load_data())\nfor major, rate in sorted(summary.items(), key=lambda x: -x[1]):\n    print(f'{major:20} {rate:.1f}%')\nplot_summary(summary)"),e.setStdout({}),t}});case"finance-predictor":return(0,t.jsx)(x,{repo:r,source:M,packages:["scikit-learn"],files:{"sample_transactions.csv":W},editableFile:{name:"sample_transactions.csv",rows:8},disclaimer:"Fabricated sample transactions — the README flags this as placeholder, to replace with your own anonymized bank export before relying on results.",bootNote:"Booting Python + scikit-learn in your browser (first run only, ~20-30s — this is a heavier package)…",run:e=>(e.runPython("_result = train_and_report()"),e.globals.get("_result"))});case"reddit-sentiment":return(0,t.jsx)(w,{repo:r});default:return(0,t.jsx)(k,{repo:r})}}var U=e.i(71810);function q({p:e,open:r,toggle:n}){let s=(0,o.useReducedMotion)();return(0,t.jsxs)("article",{className:r?"hub-card":"hub-card panel-screws",style:{position:"relative",background:"var(--surface)",border:r?"1px solid var(--signal-dim)":"1px solid var(--border)",borderRadius:4,overflow:"hidden"},children:[(0,t.jsx)(U.default,{maxTilt:2.5,children:(0,t.jsxs)("button",{onClick:n,"aria-expanded":r,"aria-controls":`case-${e.id}`,style:{width:"100%",textAlign:"left",padding:"30px 34px",display:"grid",gridTemplateColumns:"auto 1fr auto",gap:22,alignItems:"baseline"},children:[(0,t.jsxs)("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--signal)"},children:[e.index," · ",e.year]}),(0,t.jsxs)("span",{children:[(0,t.jsx)("span",{style:{display:"block",fontFamily:"var(--font-heading)",fontSize:22,fontWeight:600,letterSpacing:"-0.01em"},children:e.title}),(0,t.jsx)("span",{style:{display:"block",color:"var(--muted)",fontSize:14,marginTop:4},children:e.tagline})]}),(0,t.jsx)("span",{"aria-hidden":!0,style:{display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28,borderRadius:"50%",border:`1px solid ${r?"var(--signal-dim)":"var(--border)"}`,color:r?"var(--signal)":"var(--copper)",fontFamily:"var(--font-mono)",transition:"transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",transform:r?"rotate(45deg)":"none",boxShadow:r?"0 0 14px -2px rgba(107, 255, 155, 0.45)":"none",fontSize:16,flexShrink:0},children:"+"})]})}),(0,t.jsx)(a.AnimatePresence,{initial:!1,children:r&&(0,t.jsx)(i.motion.div,{id:`case-${e.id}`,initial:!s&&{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:s?void 0:{height:0,opacity:0},transition:{duration:.4,ease:[.22,1,.36,1]},style:{overflow:"hidden"},children:(0,t.jsxs)("div",{style:{padding:"0 34px 34px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:28,borderTop:"1px solid var(--border)",paddingTop:26},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"mono-label",style:{marginBottom:10},children:"Challenge"}),(0,t.jsx)("p",{style:{fontSize:14,color:"var(--ink)"},children:e.challenge}),(0,t.jsx)("p",{className:"mono-label",style:{margin:"20px 0 10px"},children:"Role"}),(0,t.jsx)("p",{style:{fontSize:14,color:"var(--muted)"},children:e.role})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"mono-label",style:{marginBottom:10},children:"Process & decisions"}),(0,t.jsx)("ul",{style:{listStyle:"none"},children:e.process.map((e,r)=>(0,t.jsxs)("li",{style:{fontSize:14,color:"var(--muted)",padding:"5px 0 5px 18px",position:"relative"},children:[(0,t.jsx)("span",{"aria-hidden":!0,style:{position:"absolute",left:0,color:"var(--signal)"},children:"→"}),e]},r))})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"mono-label",style:{marginBottom:10},children:"Outcome"}),(0,t.jsx)("p",{style:{fontSize:14,color:"var(--ink)"},children:e.outcome}),(0,t.jsx)("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginTop:20},children:e.tech.map(e=>(0,t.jsx)("span",{style:{fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--copper)",border:"1px solid var(--copper-dim)",padding:"4px 10px",borderRadius:2,transition:"border-color 0.25s ease, box-shadow 0.25s ease, color 0.25s ease"},onMouseEnter:e=>{e.currentTarget.style.borderColor="var(--copper)",e.currentTarget.style.boxShadow="0 0 10px -3px rgba(255, 176, 32, 0.5)"},onMouseLeave:e=>{e.currentTarget.style.borderColor="var(--copper-dim)",e.currentTarget.style.boxShadow="none"},children:e},e))})]}),(0,t.jsx)(H,{id:e.id,repo:e.repo})]})})})]})}e.s(["default",0,function(){let[e,a]=(0,r.useState)(n.projects[0].id);return(0,t.jsxs)("section",{id:"work",className:"section","aria-labelledby":"work-title",children:[(0,t.jsx)(s.default,{children:(0,t.jsxs)("div",{className:"section-header",children:[(0,t.jsx)("span",{className:"section-num",children:"01"}),(0,t.jsx)("h2",{id:"work-title",className:"section-title",children:"Selected work"}),(0,t.jsx)("div",{className:"section-line"})]})}),(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:14},children:n.projects.map((r,i)=>(0,t.jsx)(s.default,{delay:.06*i,children:(0,t.jsx)(q,{p:r,open:e===r.id,toggle:()=>a(e===r.id?null:r.id)})},r.id))})]})}],44413)},75316,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),i=e.i(72328),o=e.i(10542),n=e.i(91994),s=e.i(36699),l=e.i(59095);e.s(["default",0,function(){let e=(0,r.useRef)(null),d=(0,i.useReducedMotion)(),{scrollYProgress:c}=(0,o.useScroll)({target:e,offset:["start 0.75","end 0.6"]}),p=(0,n.useSpring)(c,{stiffness:90,damping:24}),[u,m]=(0,r.useState)(null);return(0,t.jsxs)("section",{id:"path",className:"section","aria-labelledby":"path-title",children:[(0,t.jsx)(l.default,{children:(0,t.jsxs)("div",{className:"section-header",children:[(0,t.jsx)("span",{className:"section-num",children:"02"}),(0,t.jsx)("h2",{id:"path-title",className:"section-title",children:"The signal path"}),(0,t.jsx)("div",{className:"section-line"})]})}),(0,t.jsxs)("div",{ref:e,style:{position:"relative",paddingLeft:44},children:[(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",left:11,top:0,bottom:0,width:2,background:"var(--border)"}}),(0,t.jsx)(a.motion.div,{"aria-hidden":!0,style:{position:"absolute",left:11,top:0,bottom:0,width:2,background:"linear-gradient(180deg, var(--copper), var(--signal))",transformOrigin:"top",scaleY:d?1:p,boxShadow:"0 0 12px rgba(94,234,212,0.35)"}}),(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:40},children:s.timeline.map((e,r)=>{let i="education"===e.kind?"var(--signal)":"var(--copper)",o="education"===e.kind?"rgba(94,234,212,0.5)":"rgba(217,160,91,0.5)",n=u===e.id;return(0,t.jsx)(l.default,{delay:(0,l.staggerDelay)(r,.05),children:(0,t.jsxs)(a.motion.div,{style:{position:"relative",cursor:"default",borderRadius:4},onHoverStart:()=>m(e.id),onHoverEnd:()=>m(null),whileHover:d?void 0:{x:6},transition:{type:"spring",stiffness:260,damping:22},children:[(0,t.jsx)(a.motion.span,{"aria-hidden":!0,animate:d?void 0:{scale:n?1.35:1},transition:{type:"spring",stiffness:320,damping:18},style:{position:"absolute",left:-40,top:8,width:12,height:12,borderRadius:"education"===e.kind?2:"50%",background:i,boxShadow:n?`0 0 18px ${o}`:`0 0 10px ${o}`}}),(0,t.jsx)("p",{className:"mono-label",style:{color:"var(--muted)",marginBottom:6},children:e.period}),(0,t.jsx)("h3",{style:{fontFamily:"var(--font-heading)",fontSize:22,fontWeight:600,color:i},children:e.org}),(0,t.jsx)("p",{style:{fontWeight:400,marginBottom:12},children:e.role}),(0,t.jsx)("ul",{style:{listStyle:"none"},children:e.bullets.map((e,r)=>(0,t.jsxs)("li",{style:{fontSize:14,color:"var(--muted)",padding:"4px 0 4px 18px",position:"relative",maxWidth:640},children:[(0,t.jsx)("span",{"aria-hidden":!0,style:{position:"absolute",left:0,color:"var(--copper-dim)"},children:"—"}),e]},r))})]})},e.id)})})]})]})}])},10448,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),i=e.i(72328),o=e.i(36699),n=e.i(59095);let s={language:{color:"var(--copper)",radius:105,label:"Languages"},tool:{color:"var(--signal)",radius:185,label:"Tools"},practice:{color:"#a78bfa",radius:265,label:"Practices"}};e.s(["default",0,function(){let[e,l]=(0,r.useState)(null),d=(0,i.useReducedMotion)(),c=(0,r.useMemo)(()=>{let e={language:[],tool:[],practice:[]};o.skills.forEach(t=>e[t.group].push(t.id));let t={};return Object.keys(e).forEach(r=>{let a=e[r];a.forEach((e,i)=>{let o=i/a.length*Math.PI*2-Math.PI/2+("tool"===r?.35:.7*("practice"===r));t[e]={x:320+Math.cos(o)*s[r].radius,y:320+Math.sin(o)*s[r].radius}})}),t},[]),p=(0,r.useMemo)(()=>{let e=new Set,t=[];return o.skills.forEach(r=>r.links.forEach(a=>{if(!c[a])return;let i=[r.id,a].sort().join("-");e.has(i)||(e.add(i),t.push([r.id,a]))})),t},[c]);return(0,t.jsxs)("section",{id:"skills",className:"section","aria-labelledby":"skills-title",children:[(0,t.jsx)(n.default,{children:(0,t.jsxs)("div",{className:"section-header",children:[(0,t.jsx)("span",{className:"section-num",children:"03"}),(0,t.jsx)("h2",{id:"skills-title",className:"section-title",children:"Skills as a system"}),(0,t.jsx)("div",{className:"section-line"})]})}),(0,t.jsx)(n.default,{children:(0,t.jsx)("p",{style:{color:"var(--muted)",maxWidth:560,marginBottom:36,fontSize:15},children:"No percentage bars — connections show where each skill is actually exercised. Hover or tab through the nodes to trace the links."})}),(0,t.jsx)(n.default,{children:(0,t.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:40,alignItems:"center"},children:[(0,t.jsxs)("svg",{viewBox:"0 0 640 640",role:"img","aria-label":"Interactive graph of connected skills",style:{width:"100%",maxWidth:640,margin:"0 auto",overflow:"visible"},children:[p.map(([r,i],o)=>{let n=e===r||e===i;return(0,t.jsx)(a.motion.line,{x1:c[r].x,y1:c[r].y,x2:c[i].x,y2:c[i].y,stroke:n?"var(--signal)":"var(--border)",initial:d?void 0:{pathLength:0,opacity:0},whileInView:d?void 0:{pathLength:1,opacity:1},viewport:{once:!0},transition:d?void 0:{duration:.7,delay:.015*o,ease:[.22,1,.36,1]},animate:{strokeWidth:n?1.8:1,opacity:e&&!n?.25:1},style:{transition:"stroke 0.25s"}},`${r}-${i}`)}),o.skills.map(r=>{let i,n=c[r.id],p=(i=r.id,null!==e&&e!==i&&!o.skills.find(t=>t.id===e)?.links.includes(i)&&!o.skills.find(e=>e.id===i)?.links.includes(e)),u=e===r.id;return(0,t.jsxs)(a.motion.g,{tabIndex:0,role:"button","aria-label":`${r.label}, connected to ${r.links.length} other skills`,onMouseEnter:()=>l(r.id),onMouseLeave:()=>l(null),onFocus:()=>l(r.id),onBlur:()=>l(null),initial:d?void 0:{opacity:0,scale:.6},whileInView:d?void 0:{opacity:1,scale:1},viewport:{once:!0},transition:d?void 0:{type:"spring",stiffness:240,damping:16},animate:{opacity:p?.3:1},style:{cursor:"pointer",transformOrigin:`${n.x}px ${n.y}px`},children:[(0,t.jsx)(a.motion.circle,{cx:n.x,cy:n.y,r:6,fill:s[r.group].color,animate:{scale:u?1.5:1},transition:{type:"spring",stiffness:320,damping:16},style:{transformOrigin:`${n.x}px ${n.y}px`}}),(0,t.jsx)("text",{x:n.x,y:n.y-14,textAnchor:"middle",fill:u?"var(--ink)":"var(--muted)",style:{fontFamily:"var(--font-mono)",fontSize:11.5,letterSpacing:"0.05em",transition:"fill 0.2s"},children:r.label})]},r.id)})]}),(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:14},children:Object.keys(s).map(e=>(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10},children:[(0,t.jsx)("span",{"aria-hidden":!0,style:{width:10,height:10,borderRadius:"50%",background:s[e].color}}),(0,t.jsx)("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--muted)"},children:s[e].label})]},e))})]})})]})}])},67530,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),i=e.i(36699),o=e.i(59095),n=e.i(71810);e.s(["About",0,function(){return(0,t.jsxs)("section",{id:"about",className:"section","aria-labelledby":"about-title",children:[(0,t.jsx)(o.default,{children:(0,t.jsxs)("div",{className:"section-header",children:[(0,t.jsx)("span",{className:"section-num",children:"00"}),(0,t.jsx)("h2",{id:"about-title",className:"section-title",children:i.philosophy.title}),(0,t.jsx)("div",{className:"section-line"})]})}),(0,t.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:48},children:[(0,t.jsx)(o.default,{children:(0,t.jsx)("div",{children:i.philosophy.body.map((e,r)=>(0,t.jsx)("p",{style:{color:0===r?"var(--ink)":"var(--muted)",fontSize:16,marginBottom:18,maxWidth:560},children:e},r))})}),(0,t.jsx)(o.default,{delay:.1,children:(0,t.jsx)("div",{style:{display:"grid",gap:14},children:i.philosophy.principles.map(e=>(0,t.jsx)(n.default,{maxTilt:3,children:(0,t.jsxs)("div",{className:"hub-card",style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:4,padding:"16px 20px",display:"flex",gap:16,alignItems:"baseline"},children:[(0,t.jsx)("span",{className:"mono-label",style:{whiteSpace:"nowrap"},children:e.label}),(0,t.jsx)("span",{style:{fontSize:14,color:"var(--muted)"},children:e.text})]})},e.label))})})]})]})},"Contact",0,function(){let e=[{label:"Email",value:i.identity.email,href:`mailto:${i.identity.email}`},{label:"GitHub",value:i.identity.githubLabel,href:i.identity.github},{label:"LinkedIn",value:i.identity.linkedinLabel,href:i.identity.linkedin},{label:"Phone",value:i.identity.phone,href:`tel:${i.identity.phone.replace(/[^+\d]/g,"")}`}];return(0,t.jsxs)("section",{id:"contact","aria-labelledby":"contact-title",style:{borderTop:"1px solid var(--border)",background:"var(--bg-raised)"},children:[(0,t.jsxs)("div",{className:"section",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:60,alignItems:"center"},children:[(0,t.jsx)(o.default,{children:(0,t.jsxs)("div",{children:[(0,t.jsxs)("h2",{id:"contact-title",style:{fontFamily:"var(--font-heading)",fontSize:"clamp(40px, 6vw, 64px)",fontWeight:600,lineHeight:1,letterSpacing:"-0.03em"},children:["Close the ",(0,t.jsx)("span",{style:{color:"var(--copper)"},children:"circuit."})]}),(0,t.jsxs)("p",{style:{color:"var(--muted)",marginTop:18,maxWidth:380,fontSize:15},children:[i.identity.status,". If any of this resonated, I’d genuinely love to talk."]}),(0,t.jsx)("a",{href:i.identity.resumeFile,download:!0,className:"btn btn-primary",style:{marginTop:28},children:"Download résumé"})]})}),(0,t.jsx)(o.default,{delay:.1,children:(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:10},children:e.map((e,r)=>(0,t.jsx)(o.default,{delay:(0,o.staggerDelay)(r,.05,.1),children:(0,t.jsxs)(a.motion.a,{href:e.href,target:e.href.startsWith("http")?"_blank":void 0,rel:e.href.startsWith("http")?"noopener noreferrer":void 0,whileHover:{x:4,borderColor:"var(--signal-dim)"},transition:{type:"spring",stiffness:300,damping:22},className:"hub-card",style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:4,padding:"16px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",textDecoration:"none"},children:[(0,t.jsxs)("span",{children:[(0,t.jsx)("span",{className:"mono-label",style:{display:"block",fontSize:10,marginBottom:3},children:e.label}),(0,t.jsx)("span",{style:{fontSize:14},children:e.value})]}),(0,t.jsx)("span",{"aria-hidden":!0,style:{color:"var(--copper)"},children:"→"})]})},e.label))})})]}),(0,t.jsxs)("footer",{style:{borderTop:"1px solid var(--border)",padding:"20px 44px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8},children:[(0,t.jsx)("span",{style:{fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:"var(--muted)"},children:"Johan George — 2026"}),(0,t.jsx)("span",{style:{fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:"var(--muted)"},children:"CS Student · USMC · Developer"})]})]})},"Education",0,function(){return(0,t.jsxs)("section",{id:"education",className:"section","aria-labelledby":"edu-title",children:[(0,t.jsx)(o.default,{children:(0,t.jsxs)("div",{className:"section-header",children:[(0,t.jsx)("span",{className:"section-num",children:"04"}),(0,t.jsx)("h2",{id:"edu-title",className:"section-title",children:"Education & certifications"}),(0,t.jsx)("div",{className:"section-line"})]})}),(0,t.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:14},children:[(0,t.jsx)(o.default,{delay:(0,o.staggerDelay)(0),children:(0,t.jsx)(n.default,{maxTilt:4,children:(0,t.jsxs)("div",{className:"hub-card",style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:4,padding:30,height:"100%"},children:[(0,t.jsx)("p",{className:"mono-label",style:{marginBottom:14},children:"Current"}),(0,t.jsx)("h3",{style:{fontFamily:"var(--font-heading)",fontSize:24,fontWeight:600},children:i.education.current.school}),(0,t.jsx)("p",{style:{color:"var(--muted)",fontSize:14},children:i.education.current.program}),(0,t.jsx)("p",{style:{color:"var(--signal)",fontSize:14,marginTop:6},children:i.education.current.note})]})})}),(0,t.jsx)(o.default,{delay:(0,o.staggerDelay)(1),children:(0,t.jsx)(n.default,{maxTilt:4,children:(0,t.jsxs)("div",{className:"hub-card",style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:4,padding:30,height:"100%"},children:[(0,t.jsx)("p",{className:"mono-label",style:{marginBottom:14},children:"Completed"}),(0,t.jsx)("h3",{style:{fontFamily:"var(--font-heading)",fontSize:24,fontWeight:600},children:i.education.completed.school}),(0,t.jsx)("p",{style:{color:"var(--muted)",fontSize:14},children:i.education.completed.note})]})})}),(0,t.jsx)(o.default,{delay:(0,o.staggerDelay)(2),children:(0,t.jsx)(n.default,{maxTilt:4,children:(0,t.jsxs)("div",{className:"hub-card",style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:4,padding:30,height:"100%"},children:[(0,t.jsx)("p",{className:"mono-label",style:{marginBottom:14},children:"Certifications"}),(0,t.jsx)("ul",{style:{listStyle:"none"},children:i.education.certifications.map(e=>(0,t.jsxs)("li",{style:{fontSize:13.5,color:"var(--muted)",padding:"6px 0",borderBottom:"1px solid var(--border)"},children:[(0,t.jsx)("span",{"aria-hidden":!0,style:{color:"var(--copper)",marginRight:8},children:"◆"}),e]},e))})]})})})]})]})},"FieldNotes",0,function(){let[e,n]=(0,r.useState)(new Set);return(0,t.jsxs)("section",{className:"section","aria-labelledby":"notes-title",style:{paddingTop:40,paddingBottom:40},children:[(0,t.jsx)(o.default,{children:(0,t.jsxs)("div",{style:{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:24},children:[(0,t.jsx)("p",{id:"notes-title",className:"mono-label",children:"Field notes — tap to reveal"}),(0,t.jsxs)("p",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--signal)"},children:[e.size,"/",i.discoveries.length," collected"]})]})}),(0,t.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(230px, 1fr))",gap:12},children:i.discoveries.map((r,i)=>{let s=e.has(r.id);return(0,t.jsx)(o.default,{delay:(0,o.staggerDelay)(i,.05),children:(0,t.jsxs)(a.motion.button,{onClick:()=>n(new Set(e).add(r.id)),"aria-expanded":s,whileHover:{y:-3},whileTap:{scale:.98},transition:{type:"spring",stiffness:300,damping:20},style:{width:"100%",textAlign:"left",background:s?"var(--surface)":"var(--bg-raised)",border:`1px dashed ${s?"var(--signal-dim)":"var(--border)"}`,borderRadius:4,padding:"18px 20px",minHeight:110,transition:"border-color 0.25s, background 0.25s, box-shadow 0.25s",boxShadow:s?"0 0 24px -12px rgba(107,255,155,0.35)":"none"},children:[(0,t.jsxs)("span",{className:"mono-label",style:{display:"block",marginBottom:8,color:s?"var(--signal)":"var(--muted)"},children:[s?"● ":"○ ",r.label]}),(0,t.jsx)("span",{style:{fontSize:13.5,color:s?"var(--ink)":"var(--muted)"},children:s?r.text:"Unrevealed — tap to read"})]})},r.id)})})]})}])}]);
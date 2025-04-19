
-- Add new sports categories
INSERT INTO public.sport_categories (name, description, icon_url)
VALUES 
('Cricket', 'A bat-and-ball game played between two teams of eleven players on a field with a 22-yard pitch in the center.', 'cricket.svg'),
('Volleyball', 'A team sport in which two teams of six players are separated by a net and try to score points by grounding a ball on the other team''s court.', 'volleyball.svg'),
('Tennis', 'A racket sport that can be played individually against a single opponent or between two teams of two players each.', 'tennis.svg'),
('Badminton', 'A racquet sport played using racquets to hit a shuttlecock across a net.', 'badminton.svg');

-- Add detailed information for Cricket
INSERT INTO public.sport_details (sport_category_id, rules, regulations, training_drills, strategies, image_urls)
SELECT 
  id,
  'Cricket is played between two teams of eleven players on a field with a 22-yard pitch in the center. The main objective is to score more runs than the opposing team. A match is divided into innings, where one team bats and tries to score runs, while the other team fields and tries to end the batting team''s innings. Runs are scored by batting team when batsmen run between wickets or hit the ball to or over the boundary. A boundary scores four runs if the ball touches the ground before reaching the boundary, or six runs if it crosses the boundary without touching the ground. The fielding team attempts to dismiss batsmen (get them "out") using various methods including bowling the ball to hit the wicket, catching a batted ball before it touches the ground, or hitting the wicket with the ball while the batsmen are running between wickets.',
  'Cricket is governed by the International Cricket Council (ICC) globally and by national bodies in member countries. The standard cricket field is oval-shaped with a rectangular 22-yard-long pitch in the center. The pitch has wickets at each end, consisting of three stumps topped by two bails. Equipment requirements include cricket bats (made of wood, not exceeding 38 inches in length and 4.25 inches in width), cricket balls (weighing between 5.5 and 5.75 ounces), protective gear (helmets, pads, gloves), and appropriate uniforms. Cricket has three main formats: Test matches (can last up to 5 days), One Day Internationals (50 overs per team), and Twenty20 (20 overs per team).',
  'Batting Drills: Shadow batting for technique refinement, throw-downs for specific shot practice, front and back foot defensive practice, attacking shot drills, and batting against bowling machines at varying speeds.\n\nBowling Drills: Target bowling focusing on line and length, variation practice (yorkers, bouncers, slower balls), run-up rhythm drills, and specific skill development for spin or pace bowling.\n\nFielding Drills: High catching practice, ground fielding exercises, direct-hit practice for run-outs, slip catching drills, and reaction time improvement exercises.\n\nWicketkeeping Drills: Standing-up drills, diving practice, hand-eye coordination exercises, and glove work refinement.\n\nFitness Training: Endurance building through running, sprint training for quick runs between wickets, strength training for power hitting and bowling, and agility exercises.',
  'Batting Strategies: Assess pitch conditions before selecting an approach; on bouncy pitches, play more on the back foot, while on slower pitches, come forward more often. Against spin bowling, use footwork to get to the pitch of the ball or play back to read the spin. Against pace bowling, watch the ball carefully and position early. Rotate strike regularly to keep the scoreboard moving and disrupt bowling rhythms. Accelerate scoring in limited-overs cricket during power plays or when field restrictions are in place.\n\nBowling Strategies: Study batsmen''s weaknesses and bowl accordingly. Maintain consistent line and length while strategically using variation deliveries. For pace bowlers, use the new ball to swing in the air and exploit pitch conditions. For spin bowlers, vary flight, turn, and pace to deceive batsmen. Use field placements strategically based on the batsman''s tendencies and the bowling plan.\n\nFielding and Game Strategies: Set fields based on the batsman''s strengths and weaknesses, the bowler''s style, and the match situation. In limited-overs cricket, manage bowling resources carefully, saving some overs from your best bowlers for the death (final) overs. Pace the innings when batting in limited-overs formats - consolidate in the middle overs before accelerating in the final phase.',
  ARRAY['cricket_match.jpg', 'cricket_batting.jpg', 'cricket_bowling.jpg', 'cricket_fielding.jpg']
FROM sport_categories WHERE name = 'Cricket';

-- Add detailed information for Volleyball
INSERT INTO public.sport_details (sport_category_id, rules, regulations, training_drills, strategies, image_urls)
SELECT 
  id,
  'Volleyball is played by two teams of six players on a court divided by a net. The objective is to send the ball over the net and ground it on the opponent''s court, while preventing the opponent from doing the same. Each team can touch the ball up to three times before returning it (in addition to the block touch). A point is scored when the ball touches the ground within the opponent''s court, when the opponent fails to return the ball properly, or when the opponent commits a fault. The serve rotates among players, and the team that wins a rally earns a point and the right to serve. A set is won by the first team to reach 25 points with a 2-point advantage (15 points in the deciding set). Matches are typically played best of five sets.',
  'Volleyball is governed by the International Volleyball Federation (FIVB). The standard court measures 18m x 9m with a net dividing it into two equal halves. The net height is 2.43m for men and 2.24m for women. The ball must be spherical with a circumference of 65-67cm and weight of 260-280g. Each team consists of six players on court, with up to six substitutes allowed per set. Players must follow positional rules during service, but can move freely after the service. Specialized positions include outside hitters, opposite hitters, middle blockers, setters, and liberos (defensive specialists). The libero wears a different colored jersey and has special playing privileges but cannot serve, block, or attack a ball above net height.',
  'Serving Drills: Float serve practice, jump serve development, target serving to specific court areas, and service pressure drills.\n\nPassing Drills: Individual forearm pass training, movement and pass combinations, serve reception drills, and multiple-ball passing exercises.\n\nSetting Drills: Hand positioning practice, setting from different court positions, quick set drills, and setting under pressure.\n\nHitting Drills: Approach and arm swing technique, timing exercises with setters, hitting from different positions, and hitting against blocks.\n\nBlocking Drills: Footwork training, hand positioning, double and triple block coordination, and read blocking practice.\n\nDefensive Drills: Dig training, sprawl technique development, defense positioning, and reaction time improvement exercises.\n\nTeam Drills: Six-on-six scrimmages, specific game situation drills, serve-receive patterns, and transition play practice.',
  'Offensive Strategies: Utilize fast-tempo attacks to outpace the opposing block. Incorporate combination plays where multiple attackers approach simultaneously to confuse blockers. Use the width of the net with outside and opposite hitters stretching the block. Employ back-row attacks for additional offensive options. Set to the hot hitter who is successfully finding holes in the defense. Create one-on-one situations against blockers by drawing the block away from the intended attacker.\n\nDefensive Strategies: Position defenders based on scouting of opponents'' tendencies. Implement different blocking strategies (commit, read, swing) based on the opposing attacker and set. Use perimeter defense for power hitters and rotational defense for tip/roll shots. Have specific coverage assignments for teammates'' attacks that might be blocked. Adjust back-court positioning based on the blocking arrangement.\n\nServing Strategies: Target the opposing team''s weakest passer. Serve to disrupt the opposing team''s offensive system (such as serving to the setter to prevent them from running a quick offense). Alternate short and deep serves to keep receivers off-balance. Increase serving aggression at crucial points in the match while avoiding service errors when your team has momentum.',
  ARRAY['volleyball_match.jpg', 'volleyball_serve.jpg', 'volleyball_spike.jpg', 'volleyball_block.jpg']
FROM sport_categories WHERE name = 'Volleyball';

-- Add detailed information for Tennis
INSERT INTO public.sport_details (sport_category_id, rules, regulations, training_drills, strategies, image_urls)
SELECT 
  id,
  'Tennis is played between either two players (singles) or two teams of two players (doubles). Players use rackets to hit a ball over a net into the opponent''s court. The objective is to hit the ball so that the opponent cannot return it correctly. A point is awarded when a player fails to return the ball within the boundaries of the court, hits the ball into the net, or fails to return the ball before it bounces twice on their side. Games are scored using a system of "love" (zero), 15, 30, 40, and game. A player must win by a margin of two points. Sets are won by the first player to win 6 games, with a margin of at least 2 games. If the set reaches 6-6, a tiebreak is usually played. Matches are typically best of 3 or 5 sets.',
  'Tennis is governed by the International Tennis Federation (ITF). The standard court is 78 feet (23.77m) long and 27 feet (8.23m) wide for singles, with additional width for doubles (36 feet/10.97m). The net is 3 feet (0.914m) high at the center. Tennis rackets must conform to specific size limitations (maximum 29 inches/73.7cm in length and 12.5 inches/31.7cm in width). The tennis ball must be between 2.57-2.70 inches (6.54-6.86cm) in diameter and weigh between 1.975-2.095 ounces (56.0-59.4g). Player conduct is strictly regulated, with code violations resulting in penalties ranging from point losses to disqualification. Major tournaments include the four Grand Slams: Australian Open, French Open (Roland Garros), Wimbledon, and US Open.',
  'Groundstroke Drills: Cross-court and down-the-line focused practice, consistency rallies, movement and recovery exercises, and directional control training.\n\nServe Drills: Technique refinement for first and second serves, target serving to different court zones, serve rhythm development, and serve under pressure practice.\n\nVolley Drills: Hand positioning and technique work, approach and volley combinations, reflex volley practice, and movement at the net.\n\nReturn of Serve Drills: Early preparation exercises, different return positions practice, aggressive vs. defensive return training, and return direction control.\n\nSpecialty Shot Drills: Drop shot practice, lob execution, slice technique development, and overhead smash training.\n\nFootwork Drills: Split-step timing, lateral movement training, quick direction change exercises, and recovery positioning practice.\n\nMatch Situation Drills: Point construction practice, serving out games, break point scenarios, and tiebreak situations.',
  'Baseline Strategies: Establish consistent, deep groundstrokes to keep opponents pushed back. Target the opponent''s weaker side (often the backhand for right-handed players). Change the height, spin, and pace of shots to disrupt opponent''s rhythm. Use the width of the court to create angles and open up the court. Implement patterns like hitting behind the opponent when they''re moving laterally.\n\nServe and Return Strategies: On first serves, aim for power and placement to win points directly or set up an easy second shot. Use second serves with heavy spin for consistency while still pressuring the returner. When returning, adjust position based on the server''s tendencies - stepping in against weaker serves or moving back for big servers. Look for patterns in the opponent''s serve direction based on ball toss position.\n\nCourt Positioning Strategies: Approach the net when you''ve hit a shot that forces a defensive, high, or weak reply. Stay back against opponents with strong passing shots. In doubles, have the net player poach (intercept) returns and use signals to coordinate movements. Adjust positioning based on whether you''re playing an aggressive baseliner, serve-and-volleyer, or counter-puncher.',
  ARRAY['tennis_match.jpg', 'tennis_serve.jpg', 'tennis_forehand.jpg', 'tennis_backhand.jpg']
FROM sport_categories WHERE name = 'Tennis';

-- Add detailed information for Badminton
INSERT INTO public.sport_details (sport_category_id, rules, regulations, training_drills, strategies, image_urls)
SELECT 
  id,
  'Badminton is played on a rectangular court divided by a net, either as singles (one player per side) or doubles (two players per side). The objective is to hit the shuttlecock over the net so that it lands within the opponent''s court before they can return it. Points are scored on every rally regardless of which player serves (rally point scoring system). A match consists of the best of 3 games, with each game played to 21 points. A player must win by 2 points, unless the score reaches 29-29, in which case the first to reach 30 wins. The shuttlecock must be hit only once before crossing the net, and players cannot touch the net or cross into the opponent''s court during play.',
  'Badminton is governed by the Badminton World Federation (BWF). The court measures 13.4m x 5.18m for singles and 13.4m x 6.1m for doubles. The net height is 1.55m at the edges and 1.524m at the center. The shuttlecock (birdie) consists of 16 feathers fixed into a cork base and weighs between 4.74-5.50g. Rackets are lightweight (85-100g) with a stringed area not exceeding 280mm in length and 220mm in width. Players must follow proper service rules, where the shuttle must be hit below waist height (1.15m) in an upward direction. Major tournaments include the Olympics, BWF World Championships, and the All England Open.',
  'Footwork Drills: Six-corner movement practice, split-step timing exercises, shuttle run variations, and recovery position training.\n\nService Drills: Low serve accuracy training, high serve depth practice, flick serve development, and service pressure exercises.\n\nOverhead Stroke Drills: Clear shot consistency, smash power development, drop shot control, and overhead deception practice.\n\nUnderhand Stroke Drills: Net shot precision, lift quality, drive defense, and underhand deception exercises.\n\nDrive and Block Drills: Flat drive exchanges, drive defense to attack transitions, blocking against smashes, and mid-court control training.\n\nMulti-shuttle Drills: Rapid-fire feeding for specific shots, condition games with multiple shuttles, endurance-focused multi-shuttle exercises, and random shot response training.\n\nMatch Simulation Drills: Half-court singles, specific score situation practice, specialized serving and receiving scenarios, and doubles rotation exercises.',
  'Singles Strategies: Control the center of the court (the "T" position) to minimize movement distance to all corners. Push opponents to the back corners with clears, then exploit the front court with drops and net shots. Vary the pace, trajectory, and placement of shots to prevent the opponent from anticipating. Use attacking clears to push opponents back, followed by sharp downward shots like smashes or half-smashes. When under pressure, play a defensive clear to gain time to recover position.\n\nDoubles Strategies: Maintain a front-and-back formation when attacking and side-by-side when defending. The front player focuses on controlling the net while the back player covers clears and prepares to smash. Communicate constantly about shuttlecock and position coverage. Target the area between opponents or aim at the body of the player diagonally across to create confusion. Serve short and follow up with a quick net kill or drive to the mid-court in mixed doubles, exploit the male player with faster drives and target the female player with high clears to create height advantages.\n\nShot Selection Strategies: When in a dominant position, use downward shots (smashes, drops) to maintain pressure. When defending, use upward shots (lifts, defensive clears) to regain position. Disguise shots by using the same preparation for different shots (like preparing for a smash but playing a drop). Identify and exploit the opponent''s weaker shots or movement patterns.',
  ARRAY['badminton_match.jpg', 'badminton_smash.jpg', 'badminton_serve.jpg', 'badminton_net.jpg']
FROM sport_categories WHERE name = 'Badminton';

-- Create sport diet plans table
CREATE TABLE IF NOT EXISTS public.sport_diet_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sport_category_id UUID REFERENCES sport_categories(id) NOT NULL,
  general_guidance TEXT NOT NULL,
  before_workout TEXT NOT NULL,
  during_workout TEXT NOT NULL,
  after_workout TEXT NOT NULL,
  rest_day TEXT NOT NULL,
  competition_day TEXT NOT NULL,
  recommended_foods TEXT[] NOT NULL,
  sample_meal_plan TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on diet plans table
ALTER TABLE public.sport_diet_plans ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access for sport diet plans" ON public.sport_diet_plans FOR SELECT USING (true);

-- Insert cricket diet plan
INSERT INTO public.sport_diet_plans (
  sport_category_id, 
  general_guidance, 
  before_workout, 
  during_workout, 
  after_workout, 
  rest_day, 
  competition_day, 
  recommended_foods,
  sample_meal_plan
)
SELECT 
  id,
  'Cricket players should focus on a high-carbohydrate diet to fuel endurance for long matches, with adequate protein for muscle recovery and maintenance. During multi-day Test matches, nutritional strategies should focus on recovery and replenishment between days. A typical macronutrient ratio would be 55-60% carbohydrates, 15-20% protein, and 20-25% healthy fats. Batsmen may require more endurance-focused nutrition, while fast bowlers need more protein for muscle recovery and repair.',
  'For morning training: Consume a carbohydrate-rich breakfast 2-3 hours before (oatmeal with fruit, toast with eggs). For afternoon sessions: Have a substantial lunch 3-4 hours before (rice with lean protein and vegetables) and a small snack 1 hour before if needed (fruit or energy bar).',
  'During extended training or matches: Hydrate with water plus electrolytes (aim for 125-250ml every 15-20 minutes). For sessions longer than 2 hours: Consume 30-60g carbohydrates per hour (sports drinks, energy gels, bananas, or energy bars). Cricket-specific tip: Use drinks breaks and innings changes for strategic refueling.',
  'Within 30 minutes after play: Consume a recovery snack with 20-25g protein and 50-100g carbohydrates (protein shake with banana, chocolate milk). Complete meal within 2 hours: Balanced plate with lean protein (chicken, fish), complex carbohydrates (rice, pasta, potatoes), and vegetables. Fast bowlers should increase protein intake after bowling spells for muscle repair.',
  'Maintain normal protein intake but slightly reduce carbohydrates. Focus on nutrient-dense foods and anti-inflammatory options to support recovery. Stay hydrated throughout the day. Use this time to address any nutritional gaps with extra fruits, vegetables, and whole foods.',
  'Pre-match meal (3-4 hours before): Familiar, easily digestible foods high in carbohydrates with moderate protein and low fat/fiber (pasta with light sauce and chicken). During breaks in play: Quick-energy carbohydrates and hydration (sports drinks, fruit, energy bars). Multi-day matches: Focus on complete refueling and recovery each evening with high-quality meals and adequate hydration.',
  ARRAY[
    'Whole grain cereals and bread',
    'Rice, pasta, potatoes',
    'Lean meats (chicken, fish, lean beef)',
    'Eggs',
    'Dairy or alternatives',
    'Fruits (especially bananas for quick energy)',
    'Vegetables',
    'Nuts and seeds',
    'Legumes',
    'Sports drinks and electrolyte replacements'
  ],
  'Breakfast (7 AM): Oatmeal with honey, banana, and mixed nuts + 2 boiled eggs
Snack (10 AM): Greek yogurt with berries and granola
Lunch (1 PM): Brown rice with grilled chicken breast, mixed vegetables, and avocado
Pre-training snack (3:30 PM): Toast with honey and banana
During training: Water with electrolytes, sports drink for longer sessions
Post-training (6:30 PM): Protein shake with banana
Dinner (8 PM): Grilled fish, sweet potato, steamed vegetables, and quinoa
Evening snack: Milk with turmeric (helps with recovery and inflammation)'
FROM sport_categories WHERE name = 'Cricket';

-- Insert volleyball diet plan
INSERT INTO public.sport_diet_plans (
  sport_category_id, 
  general_guidance, 
  before_workout, 
  during_workout, 
  after_workout, 
  rest_day, 
  competition_day, 
  recommended_foods,
  sample_meal_plan
)
SELECT 
  id,
  'Volleyball players require a diet that supports explosive power, quick recovery between points, and endurance for matches that may last several hours. The diet should focus on quality carbohydrates for glycogen replenishment, adequate protein for muscle repair, and healthy fats for overall health. A typical macronutrient ratio would be 50-55% carbohydrates, 20-25% protein, and 20-25% healthy fats. Players should focus on nutrient timing to support the intermittent high-intensity nature of the sport.',
  'Pre-practice meal (3-4 hours before): Complex carbohydrates with moderate protein and low fat (turkey sandwich on whole grain bread, pasta with lean meat sauce). Pre-practice snack (30-60 minutes before): Quick-digesting carbohydrates (banana, sports drink, energy bar) for immediate energy availability.',
  'During training: Primarily focus on hydration with water or electrolyte drinks (150-250ml every 15-20 minutes). For practices longer than 90 minutes: Small amounts of carbohydrates (sports drinks, energy gels, or easily digestible snacks like fruit leather) to maintain blood glucose levels and delay fatigue.',
  'Immediate post-practice (within 30 minutes): Protein and carbohydrates with 3:1 or 4:1 carb-to-protein ratio (chocolate milk, protein shake with fruit, Greek yogurt with honey and granola). Full meal (within 2 hours): Complete meal with lean protein, complex carbohydrates, vegetables, and healthy fats (chicken/fish, quinoa/rice, colorful vegetables, olive oil dressing).',
  'Slightly lower carbohydrate intake compared to training days. Maintain protein intake for continued muscle repair. Focus on anti-inflammatory foods to aid recovery (berries, fatty fish, turmeric, ginger). Increase vegetable and fruit intake for micronutrients that support recovery.',
  'Pre-match meal (3-4 hours before): Familiar, high-carbohydrate, moderate-protein meal (pasta with chicken, rice with lean protein). During warm-up/just before match: Small, carbohydrate-rich snack if needed (banana, energy bar, sports drink). Between sets/matches: Quick-digesting carbohydrates and hydration (sports drinks, fruit, energy chews). Tournament nutrition: Plan meals and snacks for all-day tournaments with easily portable, non-perishable options.',
  ARRAY[
    'Lean proteins (chicken, turkey, fish, eggs, low-fat dairy)',
    'Complex carbohydrates (whole grains, brown rice, quinoa, sweet potatoes)',
    'Fruits (especially berries and bananas)',
    'Vegetables (leafy greens, colorful vegetables)',
    'Healthy fats (avocados, nuts, olive oil, fatty fish)',
    'Hydration (water, electrolyte drinks)',
    'Recovery foods (tart cherry juice, turmeric, ginger)',
    'Quick energy sources (dried fruits, honey, sports nutrition products)'
  ],
  'Breakfast (7 AM): Oatmeal with banana, berries, Greek yogurt, and honey
Snack (10 AM): Apple with almond butter
Lunch (12:30 PM): Whole grain wrap with turkey, avocado, vegetables, and hummus + fruit salad
Pre-practice snack (3 PM): Banana and a small granola bar
During practice: Water with electrolytes
Post-practice recovery (6 PM): Chocolate milk or protein shake with banana
Dinner (7:30 PM): Grilled salmon, quinoa, roasted vegetables, and olive oil
Evening snack (9 PM): Greek yogurt with berries and honey'
FROM sport_categories WHERE name = 'Volleyball';

-- Insert tennis diet plan
INSERT INTO public.sport_diet_plans (
  sport_category_id, 
  general_guidance, 
  before_workout, 
  during_workout, 
  after_workout, 
  rest_day, 
  competition_day, 
  recommended_foods,
  sample_meal_plan
)
SELECT 
  id,
  'Tennis players require a diet that supports intermittent high-intensity efforts, quick recovery between points, and endurance for matches that can last several hours. Players should emphasize carbohydrates for muscle glycogen, adequate protein for muscle repair, and healthy fats for overall health and inflammation control. A typical macronutrient ratio would be 55-60% carbohydrates, 15-20% protein, and 20-25% healthy fats. Hydration is particularly critical due to the often hot playing conditions.',
  'Pre-practice meal (2-3 hours before): Carbohydrate-focused meal with moderate protein and low fat (pasta with tomato sauce and chicken, sandwich with lean protein and fruit). Pre-hit snack (30-60 minutes before): Small, easily digestible carbohydrate source (banana, energy bar, sports drink) to top up energy stores.',
  'During training sessions: Hydration is key - water plus electrolytes for sessions under 60 minutes, sports drinks for longer sessions (aim for 125-250ml every 15-20 minutes). For sessions longer than 90 minutes: 30-60g carbohydrates per hour from sports drinks, gels, or easily digestible foods. Use changeovers for strategic hydration and fueling.',
  'Immediate post-training (within 30 minutes): Protein and carbohydrates with approximately 3:1 carb-to-protein ratio (protein shake with fruit, chocolate milk, Greek yogurt with honey). Complete meal (within 2 hours): Balanced plate with quality protein, complex carbohydrates, vegetables, and healthy fats (grilled fish/chicken, brown rice/quinoa, colorful vegetables, olive oil).',
  'Maintain protein intake but slightly reduce carbohydrates based on lower activity level. Focus on anti-inflammatory foods to support recovery (berries, fatty fish, turmeric). Increase vegetable and fruit intake for micronutrients. Use as an opportunity to address any nutritional gaps in your regular diet.',
  'Pre-match meal (3-4 hours before): Familiar, high-carbohydrate, moderate-protein, low-fat and low-fiber meal (pasta with light sauce and chicken, rice with lean protein). During match: Hydration with electrolytes, quick-energy carbohydrates during changeovers (sports drinks, bananas, energy gels/chews). Between matches (tournaments): Quick-recovery nutrition with easily digestible carbohydrates and protein (smoothies, recovery drinks, light sandwiches).',
  ARRAY[
    'Complex carbohydrates (whole grains, oats, quinoa, sweet potatoes)',
    'Lean proteins (chicken, fish, eggs, Greek yogurt, protein supplements)',
    'Fruits (especially bananas, berries, and citrus)',
    'Vegetables (leafy greens and colorful varieties)',
    'Healthy fats (avocados, nuts, olive oil, fatty fish)',
    'Hydration sources (water, coconut water, electrolyte drinks)',
    'Recovery foods (tart cherry juice, watermelon, beet juice)',
    'Tournament-friendly portable options (trail mix, energy bars, dried fruits)'
  ],
  'Breakfast (7 AM): Oatmeal with banana, berries, honey, and a scoop of protein powder
Snack (9:30 AM): Greek yogurt with granola and fruit
Pre-practice meal (11:30 AM): Turkey and avocado sandwich on whole grain bread with side of fruit
During practice: Water with electrolytes, sports drink for sessions over 90 minutes
Post-practice recovery (3 PM): Protein shake with banana and berries
Dinner (6:30 PM): Grilled salmon, quinoa, roasted vegetables with olive oil
Evening snack (8:30 PM): Cottage cheese with pineapple or tart cherry juice'
FROM sport_categories WHERE name = 'Tennis';

-- Insert badminton diet plan
INSERT INTO public.sport_diet_plans (
  sport_category_id, 
  general_guidance, 
  before_workout, 
  during_workout, 
  after_workout, 
  rest_day, 
  competition_day, 
  recommended_foods,
  sample_meal_plan
)
SELECT 
  id,
  'Badminton players need a diet that supports explosive power, agility, quick recovery between rallies, and sustained energy for matches. The sport demands rapid bursts of energy combined with endurance. Players should focus on quality carbohydrates for glycogen replenishment, lean proteins for muscle recovery, and healthy fats for overall health. A typical macronutrient ratio would be 50-55% carbohydrates, 20-25% protein, and 20-25% healthy fats. Special attention should be paid to hydration due to the indoor playing environment and intense sweating.',
  'Pre-training meal (2-3 hours before): Balanced meal with emphasis on carbohydrates (brown rice or pasta with lean protein and vegetables). Pre-session snack (30-60 minutes before): Light carbohydrate source for quick energy (banana, sports drink, small granola bar) to avoid playing with a full stomach while ensuring energy availability.',
  'During training: Focus on hydration with water and electrolytes (150-250ml every 15-20 minutes). For longer sessions: Small amounts of quick-digesting carbohydrates (sports drinks, energy gels, fruit) to maintain blood glucose and delay fatigue. Use breaks in training to rehydrate and refuel strategically.',
  'Immediate recovery (within 30 minutes): Protein and carbohydrates in a 1:3 or 1:4 ratio (protein shake with fruit, chocolate milk, Greek yogurt with honey). Complete post-training meal (within 2 hours): Well-balanced meal with lean protein, complex carbohydrates, colorful vegetables, and healthy fats (chicken/fish/tofu with rice/quinoa/potatoes and vegetables).',
  'Maintain protein intake but slightly reduce carbohydrates based on lower activity. Focus on anti-inflammatory foods to support recovery from the high-impact nature of the sport (berries, fatty fish, turmeric, ginger). Ensure adequate hydration even on rest days. Use as an opportunity to increase vegetable and fruit intake for micronutrients.',
  'Pre-competition meal (3-4 hours before): Familiar, easily digestible meal high in carbohydrates with moderate protein (pasta with chicken, rice bowl with lean protein). During competition: Hydration with electrolytes, quick energy sources between matches (sports drinks, bananas, energy bars). Tournament nutrition: Plan easily portable, non-perishable options for all-day tournaments (trail mix, energy bars, fruit, prepared sandwiches). Recovery between matches: Quick-digesting carbohydrates with some protein for rapid glycogen replenishment.',
  ARRAY[
    'Complex carbohydrates (whole grains, oats, brown rice, sweet potatoes)',
    'Lean proteins (chicken, fish, tofu, eggs, protein supplements)',
    'Fruits (bananas, berries, citrus fruits, apples)',
    'Vegetables (leafy greens, colorful varieties, cruciferous vegetables)',
    'Healthy fats (nuts, seeds, avocados, olive oil)',
    'Hydration enhancers (electrolyte drinks, coconut water)',
    'Anti-inflammatory foods (berries, fatty fish, turmeric, ginger)',
    'Quick energy sources (dried fruits, honey, sports nutrition products)'
  ],
  'Breakfast (7 AM): Whole grain toast with eggs and avocado + fruit smoothie with protein
Snack (10 AM): Greek yogurt with mixed berries and a drizzle of honey
Lunch (12:30 PM): Brown rice bowl with grilled chicken, vegetables, and avocado
Pre-training snack (3 PM): Banana with a small handful of almonds
During training: Water with electrolytes
Post-training recovery (6:30 PM): Protein shake with banana
Dinner (8 PM): Baked salmon, quinoa, steamed vegetables with olive oil
Evening snack: Tart cherry juice or small bowl of berries with yogurt'
FROM sport_categories WHERE name = 'Badminton';

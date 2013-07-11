# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

males = User.create!([{
	username: "brad",
	name: "Bradley",
	gender: "m",
	preference: "f",
	},{
	username: "john",
	name: "John",
	gender: "m", 
	preference: "f",
	},{
	username: "david",
	name: "David",
	gender: "m", 
	preference: "f",
	},{
	username: "fred",
	name: "Fred",
	gender: "m", 
	preference: "f",
	},{
	username: "johan",
	name: "Johannes",
	gender: "m", 
	preference: "f",
	},{
	username: "apricot",
	name: "Apricot",
	gender: "m", 
	preference: "f",
	},{
	username: "tomatoes",
	name: "Tomatoes",
	gender: "m", 
	preference: "f",
	},{
	username: "tealeaves",
	name: "Tea Leaves",
	gender: "m", 
	preference: "f",
	},{
	username: "nedward",
	name: "Nedward",
	gender: "m", 
	preference: "f",
	},{
	username: "grubin",
	name: "Grubin",
	gender: "m", 
	preference: "m",
		}])
females = User.create!([{
	username: "stella",
	name: "Stella",
	gender: "f", 
	preference: "m",
	},{
	username: "mariah",
	name: "Mariah",
	gender: "f",
	preference: "m",
	},{
	username: "janine",
	name: "Janine",
	gender: "f",
	preference: "m",
	},{
	username: "basil",
	name: "Basil",
	gender: "f",
	preference: "m",
	},{
	username: "fennelseed",
	name: "Fennel Seed",
	gender: "f",
	preference: "m",
	},{
	username: "braisedlamb",
	name: "Braised Lamb",
	gender: "f",
	preference: "m",
	},{
	username: "orangereduction",
	name: "Orange Reduction",
	gender: "f",
	preference: "m",
	},{
	username: "simone",
	name: "Simone",
	gender: "f",
	preference: "m",
	}])
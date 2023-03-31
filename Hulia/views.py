from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
import json
from .metro.models import Metro, Graph
from .settings import metro_dir



def index(request):
	if not request.method == "GET":
		return HttpResponse(400)	
	return render(request, 'index.html')



def metro(request, city):
	if not request.method == 'GET':
		return HttpResponse(400)
	
	try:
		spb = Graph(f"{metro_dir}{city}.json")
	except:
		return HttpResponse(404)

	spb = Metro(spb)
	stations = spb.graph.dict.keys

	return render(request, f'metro.html', context={"city":city, "stations":stations})


def route(request, city):
	if not request.method == 'POST':
		return HttpResponse(400)

	r = json.loads(request.body)

	try:
		graph = Graph(f"{metro_dir}{city}.json")
		metro = Metro(graph)
	except:
		return JsonResponse({"success":False})


	start = r["from"]
	finish = r["to"]

	if not metro.graph.search(start) or not metro.graph.search(finish):
		return JsonResponse({"success":False})

	

	data = metro.route(start=start, finish=finish)

	return JsonResponse({"success":True, "data":data}, safe=False)
		
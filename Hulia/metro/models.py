import json
from .bfs import bfs_trt


class Graph():
	def __init__(self, path):
		self.path = path
		with open(self.path) as f:
			self.dict = json.load(f)


	def list(self):
		try:
			for key in self.dict:
				print(f'{key:_^25}\tline:{self.dict[key]["line"]}', end="")
				for neig in self.dict[key]["neighbours"]:
					print(f'   >>>{neig}', end='')
				print()
		except Exception as e:
			raise(e)


	def save(self):
		with open(self.path, 'w') as f:
			json.dump(self.dict, f)


	def add(self, name:str, line:int, neighbours:dict):
		with open(self.path) as f:
			self.dict = json.load(f)

		self.dict[name] = {"line":line, "neighbours":neighbours}

		for neighbour in neighbours:
			neig = self.dict[neighbour]
			neig["neighbours"][name] = neighbours[neighbour]


	def delete(self, name):
		st = self.dict[name]
		for neighbour in st["neighbours"]:
			del self.dict[neighbour]["neighbours"][name]

		del self.dict[name]


	def search(self, name):
		try:
			st = self.dict[name]
		except:
			return None
		return st




class Metro():
	def __init__(self, graph):
		self.graph = graph


	def route(self, start, finish):
		return bfs_trt(self.graph.dict, start, finish)

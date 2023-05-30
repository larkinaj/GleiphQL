import { Request, Response, NextFunction } from 'express';
import { parse, GraphQLList, GraphQLObjectType, GraphQLSchema } from 'graphql';

const rateLimiter = function (schema: GraphQLSchema, config: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body.query) {
      const ast = parse(req.body.query);
      let rootType = schema.getQueryType();
      let fieldScore = 0;

      function findArgs(argName: string, argValue: string): number {
        const validArgs = ['limit', 'first', 'last']
        if (validArgs.includes(argName)) {
          return Number(argValue)
        }
        else {
          return 0
        }
      }

      function calculateFieldCost(node: any, parentType: any, multiplier: number = 0) {
        if (node.selectionSet) {
          for (let i = 0; i < node.selectionSet.selections.length; i++) {
            const nodeName = node.selectionSet.selections[i].name.value;

            if (parentType.getFields()[nodeName].type instanceof GraphQLList) {
              const childType = parentType.getFields()[nodeName].type.ofType
              multiplier === 0 ? fieldScore += 1 : fieldScore += multiplier
              console.log(`Type cost after adding GraphQLLIST type ${nodeName}:`, fieldScore)

              if (node.selectionSet.selections[i].arguments.length) {
                const argName = node.selectionSet.selections[i].arguments[0].name.value
                const argValue = node.selectionSet.selections[i].arguments[0].value.value
                const childMultiplier = multiplier + findArgs(argName, argValue);
                calculateFieldCost(node.selectionSet.selections[i], childType, childMultiplier);
              } 
              else {
                calculateFieldCost(node.selectionSet.selections[i], childType, multiplier)
              }

            }
            else if (parentType.getFields()[nodeName].type instanceof GraphQLObjectType) {
              const childType = parentType.getFields()[nodeName].type
              multiplier === 0 ? fieldScore += 1 : fieldScore += multiplier
              console.log(`Type cost after adding GraphQLObject type ${nodeName}:`, fieldScore)
              calculateFieldCost(node.selectionSet.selections[i], childType)
            }
          }
        }
      }
      calculateFieldCost(ast.definitions[0], rootType)
      console.log('Type cost: ', fieldScore)
      return next();
    }
  };
};
export default rateLimiter;

import { Request, Response, NextFunction } from 'express';
import { parse, GraphQLList, GraphQLObjectType, GraphQLSchema } from 'graphql';

const rateLimiter = function (schema: GraphQLSchema, config: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body.query) {
      const ast = parse(req.body.query);
      let rootType = schema.getQueryType();
      let typeScore = 0;

      function findArgs(argName: string, argValue: string): number {
        const validArgs = ['limit', 'first', 'last']
        if (validArgs.includes(argName)) {
          return Number(argValue)
        }
        else {
          return 0
        }
      }

      function calculateTypeCost(node: any, parentType: any, multiplier: number = 1) {
        if (node.selectionSet) {
          for (let i = 0; i < node.selectionSet.selections.length; i++) {
            const nodeName = node.selectionSet.selections[i].name.value;

            // conditional statement to check if query is an "introspection" query
            if (nodeName !== '__schema') {

              // conditional statement to check if the node type is a GraphQLList
              if (parentType.getFields()[nodeName].type instanceof GraphQLList) {
                const childType = parentType.getFields()[nodeName].type.ofType
                typeScore += multiplier
                console.log(`Type cost after adding GraphQLLIST type ${nodeName}:`, typeScore)
                if (node.selectionSet.selections[i].arguments.length) {
                  const argName = node.selectionSet.selections[i].arguments[0].name.value
                  const argValue = node.selectionSet.selections[i].arguments[0].value.value
                  const childMultiplier = multiplier * findArgs(argName, argValue);
                  calculateTypeCost(node.selectionSet.selections[i], childType, childMultiplier);
                } 
                else {
                  calculateTypeCost(node.selectionSet.selections[i], childType, multiplier)
                }
  
              }
              // conditional statement to check if the node type is a GraphQLObject
              else if (parentType.getFields()[nodeName].type instanceof GraphQLObjectType) {
                const childType = parentType.getFields()[nodeName].type
                typeScore += multiplier
                console.log(`Type cost after adding GraphQLObject type ${nodeName}:`, typeScore)
                if (node.selectionSet.selections[i].arguments.length) {
                  const argName = node.selectionSet.selections[i].arguments[0].name.value;
                  const argValue = node.selectionSet.selections[i].arguments[0].value.value;
                  const childMultiplier = multiplier * findArgs(argName, argValue);
                  calculateTypeCost(node.selectionSet.selections[i], childType, childMultiplier);
                }
                else {
                  calculateTypeCost(node.selectionSet.selections[i], childType, multiplier);
                }
              }
            }
          }
        }
      }
      calculateTypeCost(ast.definitions[0], rootType)
      console.log('Total type cost: ', typeScore)
    }
    return next();
  };
};
export default rateLimiter;
